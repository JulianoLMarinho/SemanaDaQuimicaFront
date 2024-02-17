import { Injectable } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { firstValueFrom, lastValueFrom, Subject } from 'rxjs';
import { AuthResponseBody } from '../shared/models/authResponseBody';
import { Usuario } from '../shared/models/usuario';
import { HttpService } from './http.service';
import { LocalStorageService } from './localStorage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userChange: Subject<SocialUser> = new Subject<SocialUser>();
  authResponse: Subject<AuthResponseBody> = new Subject<AuthResponseBody>();
  loginError: Subject<any> = new Subject<any>();
  usuarioLogado?: Usuario;
  isAuthenticated: boolean = false;
  loading: boolean = true;
  faltamDados = false;

  constructor(
    public afAuth: AngularFireAuth,
    private http: HttpService,
    private localStorage: LocalStorageService
  ) {
    /* this.afAuth.idToken.subscribe((res) => {
      if (res) {
        this.localStorage.set('id_token', res);
        this.apiAuth(res, 'GOOGLE');
      } else {
        this.loading = false;
      }
    }); */
    this.afAuth.user.subscribe(async (user) => {
      if (user?.emailVerified) {
        const token = await user.getIdToken();
        this.localStorage.set('id_token', token);
        this.apiAuth(token, 'GOOGLE');
      } else {
        this.loading = false;
      }
    });
    let usuario = this.localStorage.get<Usuario>('user');
    if (usuario) this.usuarioLogado = usuario;
  }

  async login(userEmail: string, userPassword: string) {
    const user = await this.afAuth.signInWithEmailAndPassword(
      userEmail,
      userPassword
    );
    return user;
  }

  loginWithGoogle() {
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {});
  }

  async cadastrar(email: string, senha: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, senha);
    await this.enviarEmailConfirmacao();
  }

  logout(reloadPage = true) {
    // this.socialAuthService.signOut();
    this.localStorage.remove('access_token');
    this.localStorage.remove('id_token');
    this.localStorage.remove('user');
    this.afAuth.signOut().then((_) => {
      if (reloadPage) location.reload();
    });
  }

  apiAuth(token: string, provider: string) {
    this.http
      .post<AuthResponseBody, any>('authenticate', {
        token: token,
        source: provider,
      })
      .subscribe({
        next: (res) => {
          if (res.responseType === 'OK') {
            this.isAuthenticated = true;
            this.usuarioLogado = res.usuario;
            this.faltamDados =
              !this.usuarioLogado?.email ||
              !this.usuarioLogado?.nome ||
              !this.usuarioLogado?.cidade ||
              !this.usuarioLogado?.estado ||
              !this.usuarioLogado?.genero ||
              !this.usuarioLogado?.nivel ||
              !this.usuarioLogado?.tamanho_camisa ||
              (['Ensino Técnico', 'Graduação'].includes(
                this.usuarioLogado?.nivel || ''
              ) &&
                (!this.usuarioLogado?.universidade ||
                  !this.usuarioLogado?.curso));

            if (this.usuarioLogado) {
              this.usuarioLogado.accessToken = res.access_token;
              this.localStorage.set('access_token', res.access_token);
              this.localStorage.set('user', this.usuarioLogado);
              this.loading = false;
            }
          } else {
            this.logout(false);
            this.loading = false;
          }
          this.authResponse.next(res);
        },
        error: (error) => {
          switch (error.status) {
            case 403:
              if (error?.error?.detail === 'GOOGLE_NAO_ASSOCIADO') {
                this.loginError.next(error.error.detail);
              }
              break;
            case 404:
              if (error?.error?.detail === 'USUARIO_NAO_EXISTE') {
                this.loginError.next(error.error.detail);
              }
              break;
          }
        },
      });
  }

  async apiAuthAsync(token: string, provider: string) {
    const res = await firstValueFrom(
      this.http.post<AuthResponseBody, any>('authenticate', {
        token: token,
        source: provider,
      })
    );

    if (res && res.access_token) {
      if (res.responseType === 'OK') {
        this.isAuthenticated = true;
        this.usuarioLogado = res.usuario;
        if (this.usuarioLogado) {
          this.usuarioLogado.accessToken = res.access_token;
          this.localStorage.set('access_token', res.access_token);
          this.localStorage.set('user', this.usuarioLogado);
          this.loading = false;
        }
      } else {
        this.logout(false);
        this.loading = false;
      }
      this.authResponse.next(res);
    }
  }

  getAccessToken(): string | null {
    const access_token = this.localStorage.get<string>('access_token');
    return access_token;
  }

  async getAccessTokenAsync() {
    const token = await firstValueFrom(this.afAuth.idToken);
    const oldIdToken = this.localStorage.get<string>('id_token');
    if (token !== null && token !== oldIdToken) {
      await this.apiAuthAsync(token, 'GOOGLE');
    }
    const access_token = this.localStorage.get<string>('access_token');
    return access_token;
  }

  userIsAdmin(): boolean {
    if (this.usuarioLogado?.perfil === 'adm') return true;
    return false;
  }

  async enviarEmailConfirmacao() {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.sendEmailVerification();
      await this.afAuth.signOut();
    }
  }

  async resetarSenha(email: string) {
    await this.afAuth.sendPasswordResetEmail(email);
  }

  verificarEmail(codigo: string) {
    return this.afAuth.applyActionCode(codigo);
  }
}
