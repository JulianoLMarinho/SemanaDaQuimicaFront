import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EdicaoSemana } from '../../models/edicao-semana';
import { SocialButton } from '../../models/social-button.interface';
import { Usuario } from '../../models/usuario';
import { getSocialButtons, SOCIAL_LOGINS } from './social-buttons.option';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  socialButtons: SocialButton[] = getSocialButtons(
    this.genericLogin.bind(this)
  );
  cadastroUsuario = false;
  usuario: Usuario = {
    id: 0,
    nome: '',
    email: '',
  };
  semanaAtiva: EdicaoSemana;
  loginEmailSenha: {
    email?: string;
    senha?: string;
  } = {};
  mostrarEmailESenhaLogin = false;

  constructor(
    private authService: AuthenticationService,
    private activeModal: NgbActiveModal,
    private usuarioService: UsuarioService,
    private edicaoSemanaService: EdicaoSemanaService
  ) {
    this.semanaAtiva = this.edicaoSemanaService.semanaAtiva;
  }

  ngOnInit() {
    this.authService.loginError.asObservable().subscribe((errorCode) => {
      if (errorCode === 'USUARIO_NAO_EXISTE') {
        this.cadastroUsuario = true;
        this.loading = false;
      }
    });

    this.authService.authResponse.asObservable().subscribe((response) => {
      switch (response.responseType) {
        case 'OK':
          this.activeModal.close();
          break;
        case 'USUARIO_NAO_EXISTE':
          this.cadastroUsuario = true;
          this.loading = false;
          this.usuario = <Usuario>response.usuario;
          break;
        default:
          this.activeModal.close();
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook() {
    alert('Ainda não foi implementado');
  }

  async loginWithEmailSenha() {
    if (this.loginEmailSenha.email && this.loginEmailSenha.senha) {
      const t = await this.authService.cadastrar(
        this.loginEmailSenha.email,
        this.loginEmailSenha.senha
      );
      console.log(t);
    }
  }

  genericLogin(source: SOCIAL_LOGINS) {
    this.loading = true;
    switch (source) {
      case 'FACEBOOK':
        this.loginWithFacebook();
        break;
      case 'GOOGLE':
        this.loginWithGoogle();
        break;
      default:
        console.log('Login method not implemented');
    }
  }

  salvarUsuario() {
    this.usuarioService.salvarUsuario(<Usuario>this.usuario).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
