import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AtividadesService } from '../../../../services/atividades.service';
import { EdicaoSemanaService } from '../../../../services/edicaoSemana.service';
import { InscricaoService } from '../../../../services/inscricao.service';
import { ModalFieldConfiguration } from '../../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { AtividadeLista } from '../../../../shared/models/atividades';
import { EdicaoSemana } from '../../../../shared/models/edicao-semana';
import { TabelasObject } from '../../../../shared/models/tabelas-exportacao';
import { BaseTabelaService } from './baseTabela.service';

@Injectable({
  providedIn: 'root',
})
export class AlunosAtividadesService extends BaseTabelaService {
  public tabela: TabelasObject<any> = {
    nome: 'Atividades por Aluno',
    filtros: [
      {
        nome: 'Edição',
        opcoes: this.loadEdicoes.bind(this),
        opcoesLista: [],
        opcaoSelecionada: null,
        loading: false,
        selecionarAcao: this.loadAtividades.bind(this),
        opcaoLabel: (edicao: EdicaoSemana) =>
          edicao.parsed_data_inicio.getFullYear() + ' - ' + edicao.tema,
      },
      {
        nome: 'Atividade',
        opcoesLista: [],
        opcaoSelecionada: null,
        loading: false,
        selecionarAcao: this.carregarAlunosAtividades.bind(this),
        opcaoLabel: (edicao: AtividadeLista) => edicao.titulo,
      },
    ],
    loadTabela: this.carregarAlunosAtividades.bind(this),
    dados: [],
    obterModelo: this.obterModelo,
    mostrarTabela: true,
  };

  constructor(
    private atividadesService: AtividadesService,
    private toast: ToastrService,
    private inscricaoService: InscricaoService,
    private edicaoService: EdicaoSemanaService
  ) {
    super();
  }

  loadAtividades(tabela: TabelasObject<any>) {
    const atividade = tabela.filtros.find((x: any) => x.nome === 'Atividade');
    this.tabela.filtros[1].opcaoSelecionada = null;
    this.carregarAlunosAtividades(tabela);

    const edicao = tabela.filtros.find(
      (x: { nome: string }) => x.nome === 'Edição'
    )!.opcaoSelecionada;
    atividade!.loading = true;
    this.atividadesService.getAtividadesByEdicaoInscricao(edicao.id).subscribe({
      next: (atividades) => {
        atividade!.opcoesLista = atividades;
      },
      error: (_) => {
        this.toast.error('Erro ao carregar presença');
      },
      complete: () => {
        atividade!.loading = false;
      },
    });
  }

  carregarAlunosAtividades(tabela: TabelasObject<any>) {
    const edicao = tabela.filtros.find((x: any) => x.nome === 'Edição');
    const atividade = tabela.filtros.find((x: any) => x.nome === 'Atividade');

    this.inscricaoService
      .obterAtividadesAlunos(
        edicao!.opcaoSelecionada.id,
        atividade?.opcaoSelecionada?.id
      )
      .subscribe((res: any) => {
        tabela.dados = res;
      });
  }

  loadEdicoes(tabela: TabelasObject<any>) {
    this.tabela.filtros[0].opcaoSelecionada = null;
    this.tabela.filtros[1].opcaoSelecionada = null;
    this.tabela.dados = [];
    const edicaoFiltro = tabela.filtros.find(
      (x: { nome: string }) => x.nome === 'Edição'
    );
    edicaoFiltro!.loading = true;
    this.edicaoService.getEdicoes().subscribe({
      next: (edicoes) => {
        edicaoFiltro!.opcoesLista = edicoes;
      },
      error: (error) => {
        this.toast.error('Não foi possível carregar as edições');
      },
      complete: () => {
        edicaoFiltro!.loading = false;
      },
    });
  }

  obterModelo(): ModalFieldConfiguration[] {
    return [
      {
        fieldName: 'Nome',
        fieldProperty: 'aluno_nome',
      },
      {
        fieldName: 'Email',
        fieldProperty: 'aluno_email',
      },
      {
        fieldName: 'Atividade',
        fieldProperty: 'atividade_titulo',
      },
    ];
  }
}
