import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { LocalizacaoService } from '../../services/localizacao.service';
import { StyleService } from '../../services/style.service';
import { UsuarioService } from '../../services/usuario.service';
import { Estado, Municipio } from '../../shared/models/localizacao';
import { Usuario } from '../../shared/models/usuario';

@Component({
  selector: 'app-meusDados',
  templateUrl: './meusDados.component.html',
  styleUrls: ['./meusDados.component.scss'],
})
export class MeusDadosComponent implements OnInit {
  usuario?: Usuario;
  usuarioOld?: Usuario;
  estados: Estado[] = [];
  cidades: Municipio[] = [];
  filteredOptions: Observable<Estado[]> = new Observable<Estado[]>();
  loading = true;
  loadingEstado = false;
  loadingCidade = false;
  loadingSave = false;
  editando = false;
  nivelOpcao = [
    'Graduação',
    'Ensino Técnico',
    'Ensino Médio',
    'Ensino Fundamental',
    'Outro',
  ];
  cursosOpcoes = {
    tecnico: [
      'Química',
      'Controle Ambiental',
      'Biotecnologia',
      'Farmácia',
      'Polímeros',
      'Petróleo e Gás',
    ],
    graduacao: [
      'QAT',
      'Licenciatura em Química',
      'Química',
      'Química Industrial',
      'Engenharia Química',
      'Engenharua de Alimentos',
      'Farmácia',
      'Física',
      'Astronomia',
      'Biologia',
    ],
  };
  generoOpcoes = [
    'Masculino',
    'Feminino',
    'Não binário',
    'Outro',
    'Prefiro não responder',
  ];

  instituicoes = {
    tecnico: [
      'IFRJ - Maracanã',
      'IFRJ - Paracambi',
      'IFRJ - Nilópolis',
      'FAETEC',
    ],
    graduacao: ['UFRJ', 'UFF', 'UFRRJ', 'UERJ', 'PUC', 'Unirio', 'Estácio'],
  };

  tamanhos = ['P', 'M', 'G', 'GG', 'XGG'];

  constructor(
    private userService: UsuarioService,
    private toastr: ToastrService,
    public styleService: StyleService,
    private localizacaoService: LocalizacaoService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.usuario = this.authService.usuarioLogado;
    if (this.usuario?.estado!) {
      this.carregarMunicipios();
    }
    this.loading = false;
    this.carregarEstados();
  }

  selecionarEstado(uf: string) {
    this.usuario!.estado = uf;
    this.carregarMunicipios();
  }

  selecionarMunicipio(municipio: string) {
    this.usuario!.cidade = municipio;
  }

  carregarEstados() {
    this.loadingEstado = true;
    this.localizacaoService.getUFs().subscribe(
      (res) => {
        this.estados = res;
        this.loadingEstado = false;
      },
      (error) => {
        this.toastr.error('Não foi possível carregar a lista de estados!');
        this.loadingEstado = false;
      }
    );
  }

  carregarMunicipios() {
    this.loadingCidade = true;
    this.localizacaoService.getMunicipios(this.usuario?.estado!).subscribe(
      (m) => {
        this.cidades = m;
        this.loadingCidade = false;
      },
      (error) => {
        this.toastr.error('Não foi possível carregar a lista de cidades!');
        this.loadingCidade = false;
      }
    );
  }

  salvarUsuario() {
    if (this.usuario && this.usuario.nome && this.usuario.tamanho_camisa) {
      this.loadingSave = true;
      this.userService.atualizarUsuario(this.usuario).subscribe({
        next: (res) => {
          if (!res) {
            this.toastr.error('Não é possível salvar o usuario');
          } else {
            this.toastr.success('Usuário atualizado com sucesso');
            window.location.reload();
          }
        },
        error: (error) => {
          this.toastr.error('Não é possível salvar o usuario');
        },
        complete: () => {
          this.loadingSave = false;
          this.editando = false;
        },
      });
    } else
      this.toastr.error(
        'Não é possível salvar o usuario. Verifique se os campos obrigatórios estão preenchidos.'
      );
  }

  editar() {
    this.usuarioOld = <Usuario>JSON.parse(JSON.stringify(this.usuario!));
    this.editando = true;
  }

  cancelar() {
    this.usuario = this.usuarioOld;
    this.editando = false;
    this.carregarEstados();
    this.carregarMunicipios();
  }
}
