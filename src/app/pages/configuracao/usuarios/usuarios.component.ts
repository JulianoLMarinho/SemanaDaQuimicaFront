import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  CustomActions,
  ModalFieldConfiguration,
} from 'src/app/shared/components/modal-adicionar-editar/modal-field-configuration';
import { ModalConfirmacaoComponent } from 'src/app/shared/components/modal-confirmacao/modal-confirmacao.component';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  acoes: CustomActions[] = [];
  loading = true;

  constructor(
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
    this.acoes = this.obterAcoes();
  }

  obterModelo(usuario?: Usuario): ModalFieldConfiguration[] {
    return [
      {
        fieldName: 'ID',
        fieldInitialValue: usuario?.id,
        fieldProperty: 'id',
        fieldType: 'number',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
        fieldVisible: () => false,
      },
      {
        fieldName: 'Nome',
        fieldInitialValue: usuario?.nome,
        fieldProperty: 'nome',
        fieldType: 'text',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
      },
      {
        fieldName: 'Email',
        fieldInitialValue: usuario?.email,
        fieldProperty: 'email',
        fieldType: 'text',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
      },
      {
        fieldName: 'Perfil',
        fieldInitialValue: usuario?.perfil,
        fieldProperty: 'perfil',
        fieldType: 'text',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldDisplayFormatter(args) {
          if (args.perfil === 'adm') {
            return 'Administrador';
          } else {
            return 'Aluno';
          }
        },
      },
      {
        fieldName: 'Nível',
        fieldInitialValue: usuario?.nivel,
        fieldProperty: 'nivel',
        fieldType: 'text',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Curso',
        fieldInitialValue: usuario?.curso,
        fieldProperty: 'curso',
        fieldType: 'text',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Instituição',
        fieldInitialValue: usuario?.universidade,
        fieldProperty: 'universidade',
        fieldType: 'text',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Estado',
        fieldInitialValue: usuario?.estado,
        fieldProperty: 'estado',
        fieldType: 'text',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Cidade',
        fieldInitialValue: usuario?.cidade,
        fieldProperty: 'cidade',
        fieldType: 'text',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Tamanho da Camisa',
        fieldInitialValue: usuario?.tamanho_camisa,
        fieldProperty: 'tamanho_camisa',
        fieldType: 'text',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
    ];
  }

  obterAcoes(): CustomActions[] {
    return [
      {
        action: this.alterarPermissaoUsuario.bind(this),
        name: 'Editar Perfil',
        icon: 'manage_accounts',
        tooltip: 'Alterar Perfil do Usuário',
      },
    ];
  }

  carregarUsuarios() {
    this.loading = true;
    this.usuarioService.obterTodosUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (_) => {
        this.toast.error('Houve algum erro!');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  alterarPermissaoUsuario(usuario: Usuario) {
    const perfilChange = this.modalService.open(ModalConfirmacaoComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });

    perfilChange.componentInstance.titulo = 'Alterar perfil do usuário';
    perfilChange.componentInstance.mensagem = `Desejar alterar o perfil do usuário ${
      usuario.nome
    } de ${usuario.perfil === 'adm' ? 'Administrador' : 'Aluno'} para ${
      usuario.perfil === 'adm' ? 'Aluno' : 'Administrador'
    }?`;

    perfilChange.componentInstance.salvar = () => {
      this.usuarioService
        .alterarPerfilUsuario(usuario.id, usuario.perfil_usuario === 1 ? 2 : 1)
        .subscribe({
          next: (_) => {
            this.toast.success('Permissão do usuário alterada com sucesso.');
            this.carregarUsuarios();
            perfilChange.dismiss();
          },
          error: (_) => {
            this.toast.success('Ocorreu algum erro');
          },
          complete: () => {
            this.loading = false;
            perfilChange.componentInstance.loading = false;
          },
        });
    };
  }
}
