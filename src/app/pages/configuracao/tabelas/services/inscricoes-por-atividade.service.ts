import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AtividadesService } from 'src/app/services/atividades.service';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
import { InscricaoService } from 'src/app/services/inscricao.service';
import { ModalFieldConfiguration } from 'src/app/shared/components/modal-adicionar-editar/modal-field-configuration';
import { AtividadeLista } from 'src/app/shared/models/atividades';
import { EdicaoSemana } from 'src/app/shared/models/edicao-semana';
import { TabelasObject } from 'src/app/shared/models/tabelas-exportacao';

@Injectable({
  providedIn: 'root',
})
export class InscricoesPorAtividadeService {
  public tabela: TabelasObject<any> = {
    nome: 'Inscrições por Atividade',
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
        selecionarAcao: this.carregarInscricoes.bind(this),
        opcaoLabel: (edicao: AtividadeLista) => edicao.titulo,
      },
    ],
    loadTabela: this.carregarInscricoes.bind(this),
    dados: [],
    obterModelo: this.obterModelo,
  };

  constructor(
    private atividadesService: AtividadesService,
    private toast: ToastrService,
    private inscricaoService: InscricaoService,
    private edicaoService: EdicaoSemanaService
  ) {}

  loadAtividades(tabela: TabelasObject<any>) {
    const edicao = tabela.filtros.find(
      (x: { nome: string }) => x.nome === 'Edição'
    )!.opcaoSelecionada;
    const atividade = tabela.filtros.find((x: any) => x.nome === 'Atividade');
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

  carregarInscricoes(tabela: TabelasObject<any>) {
    const atividade = tabela.filtros.find((x: any) => x.nome === 'Atividade');

    this.inscricaoService
      .obterInscricoesPorAtividade(atividade!.opcaoSelecionada.id)
      .subscribe((res: any) => {
        tabela.dados = res;
      });
  }

  obterModelo(atividade: any): ModalFieldConfiguration[] {
    return [
      {
        fieldName: 'Nome',
        fieldProperty: 'nome',
      },
      {
        fieldName: 'Email',
        fieldProperty: 'email',
      },
    ];
  }

  loadEdicoes(tabela: TabelasObject<any>) {
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
}
