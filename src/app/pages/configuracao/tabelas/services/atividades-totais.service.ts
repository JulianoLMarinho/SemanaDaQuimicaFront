import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AtividadesService } from '../../../../services/atividades.service';
import { EdicaoSemanaService } from '../../../../services/edicaoSemana.service';
import { ModalFieldConfiguration } from '../../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { EdicaoSemana } from '../../../../shared/models/edicao-semana';
import {
  InscricoesEdicao,
  TabelasObject,
} from '../../../../shared/models/tabelas-exportacao';

@Injectable({
  providedIn: 'root',
})
export class AtividadesTotaisService {
  public tabela: TabelasObject<any> = {
    nome: 'Totais das Atividades',
    filtros: [
      {
        nome: 'Edição',
        opcoes: this.loadEdicoes.bind(this),
        opcoesLista: [],
        opcaoSelecionada: null,
        loading: false,
        selecionarAcao: this.carregarAtividades.bind(this),
        opcaoLabel: (edicao: EdicaoSemana) =>
          edicao.parsed_data_inicio.getFullYear() + ' - ' + edicao.tema,
      },
    ],
    loadTabela: this.carregarAtividades.bind(this),
    dados: [],
    obterModelo: this.obterModelo,
  };

  constructor(
    private atividadesService: AtividadesService,
    private toast: ToastrService,
    private edicaoService: EdicaoSemanaService
  ) {}

  carregarAtividades(tabela: TabelasObject<any>) {
    const edicao = tabela.filtros.find((x: any) => x.nome === 'Edição');

    this.atividadesService
      .obterTotaisAtividades(edicao!.opcaoSelecionada.id)
      .subscribe((res: any[]) => {
        tabela.dados = res;
      });
  }

  obterModelo(inscricao: any): ModalFieldConfiguration[] {
    return [
      {
        fieldName: 'Título',
        fieldProperty: 'titulo',
      },
      {
        fieldName: 'Vagas',
        fieldProperty: 'vagas',
      },
      {
        fieldName: 'Vagas Restantes',
        fieldProperty: 'vagas_restantes',
      },
      {
        fieldName: 'Inscrições Confirmadas',
        fieldProperty: 'inscricoes_confirmadas',
      },
      {
        fieldName: 'Inscrições Canceladas',
        fieldProperty: 'inscricoes_canceladas',
      },
      {
        fieldName: 'Inscrições Aguardando Pagamento',
        fieldProperty: 'inscricoes_aguardando_pagamento',
      },
      {
        fieldName: 'Inscrições Com Pagamento Informado',
        fieldProperty: 'inscricoes_pagamento_informado',
      },
    ];
  }

  loadEdicoes(tabela: TabelasObject<InscricoesEdicao>) {
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
