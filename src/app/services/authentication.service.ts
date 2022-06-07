import { Injectable } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Subject } from 'rxjs';
import { AuthResponseBody } from '../shared/models/authResponseBody';
import { Usuario } from '../shared/models/usuario';
import { HttpService } from './http.service';
import { LocalStorageService } from './localStorage.service';

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

  constructor(
    public socialAuthService: SocialAuthService,
    private http: HttpService,
    private localStorage: LocalStorageService
  ) {
    let usuario = this.localStorage.get<Usuario>('user');
    if (usuario) this.usuarioLogado = usuario;
    this.socialAuthService.authState.subscribe((user) => {
      if (user) this.apiAuth(user.idToken, user.provider);
      else this.loading = false;
    });
  }

  loginWithGoogle(): Promise<SocialUser> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout(reloadPage = true) {
    this.socialAuthService.signOut();
    this.localStorage.remove('access_token');
    this.localStorage.remove('user');
    if (reloadPage) location.reload();
  }

  apiAuth(token: string, provider: string) {
    this.http
      .post<AuthResponseBody, any>('authenticate', {
        token: token,
        source: provider,
      })
      .subscribe(
        (res) => {
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
        },
        (error) => {
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
        }
      );
  }

  getAccessToken(): string | null {
    const access_token = this.localStorage.get<string>('access_token');
    return access_token;
  }

  userIsAdmin(): boolean {
    if (this.usuarioLogado?.perfil === 'adm') return true;
    return false;
  }
}
