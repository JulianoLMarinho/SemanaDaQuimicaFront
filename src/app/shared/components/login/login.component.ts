import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';
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
    confirmacaoSenha?: string;
  } = {};
  cadastroEmailSenha = false;
  mostrarEmailESenhaLogin = false;
  aguardandoValidacao = false;

  erroLogin = false;
  erroLoginMessage = '';

  esqueceuSenha = false;

  constructor(
    private authService: AuthenticationService,
    private activeModal: NgbActiveModal,
    private usuarioService: UsuarioService,
    private edicaoSemanaService: EdicaoSemanaService,
    public coresEdicao: CoresEdicaoService,
    private toast: ToastrService
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
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook() {
    alert('Ainda não foi implementado');
  }

  loginWithEmailSenha() {
    if (this.loginEmailSenha.email && this.loginEmailSenha.senha) {
      this.loading = true;
      this.authService
        .login(this.loginEmailSenha.email, this.loginEmailSenha.senha)
        .then(
          (res) => {
            if (!res.user?.emailVerified) {
              this.aguardandoValidacao = true;
            }
          },
          (err) => {
            if (err.code === 'auth/user-not-found') {
              this.erroLogin = true;
              this.erroLoginMessage = 'O email cadastrado não existe';
            }
            if (err.code === 'auth/wrong-password') {
              this.erroLogin = true;
              this.erroLoginMessage = 'Usuário e/ou senha incorretos';
            }
            this.loading = false;
          }
        );
    }
  }

  async cadastrarUsuario() {
    if (this.loginEmailSenha.senha !== this.loginEmailSenha.confirmacaoSenha) {
    } else {
      const ret = await this.authService.cadastrar(
        this.loginEmailSenha.email!,
        this.loginEmailSenha.senha!
      );
      this.cadastroEmailSenha = false;
      this.aguardandoValidacao = true;
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

  confirmarEmail() {
    this.authService.enviarEmailConfirmacao();
  }

  async recuperarSenha() {
    if (this.loginEmailSenha.email) {
      await this.authService.resetarSenha(this.loginEmailSenha.email);
      this.toast.info(
        'Verifique o seu email para obter o link de recuperação. Caso não encontre o email, verifique a caixa de spam.'
      );
      this.activeModal.close();
    }
  }
}
