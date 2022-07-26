import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AtividadesService } from 'src/app/services/atividades.service';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
import { InscricaoService } from 'src/app/services/inscricao.service';
import { ModalFieldConfiguration } from 'src/app/shared/components/modal-adicionar-editar/modal-field-configuration';
import { AtividadeLista } from 'src/app/shared/models/atividades';
import { EdicaoSemana } from 'src/app/shared/models/edicao-semana';
import {
  InscricoesEdicao,
  TabelasObject,
} from 'src/app/shared/models/tabelas-exportacao';

@Injectable({
  providedIn: 'root',
})
export class InscricoesPorEdicaoService {
  public tabela: TabelasObject<InscricoesEdicao> = {
    nome: 'Inscrições por Edição',
    filtros: [
      {
        nome: 'Edição',
        opcoes: this.loadEdicoes.bind(this),
        opcoesLista: [],
        opcaoSelecionada: null,
        loading: false,
        selecionarAcao: this.carregarInscricoes.bind(this),
        opcaoLabel: (edicao: EdicaoSemana) =>
          edicao.parsed_data_inicio.getFullYear() + ' - ' + edicao.tema,
      },
    ],
    loadTabela: this.carregarInscricoes.bind(this),
    dados: [],
    obterModelo: this.obterModelo,
  };

  constructor(
    private toast: ToastrService,
    private inscricaoService: InscricaoService,
    private edicaoService: EdicaoSemanaService
  ) {}

  carregarInscricoes(tabela: TabelasObject<InscricoesEdicao>) {
    const edicao = tabela.filtros.find((x: any) => x.nome === 'Edição');

    this.inscricaoService
      .obterInscricoesPorEdicao(edicao!.opcaoSelecionada.id)
      .subscribe((res: InscricoesEdicao[]) => {
        tabela.dados = res;
      });
  }

  obterModelo(inscricao: any): ModalFieldConfiguration[] {
    return [
      {
        fieldName: 'Nome',
        fieldProperty: 'nome',
      },
      {
        fieldName: 'Email',
        fieldProperty: 'email',
      },
      {
        fieldName: 'Nível',
        fieldProperty: 'nivel',
      },
      {
        fieldName: 'Instituição',
        fieldProperty: 'universidade',
      },
      {
        fieldName: 'Curso',
        fieldProperty: 'curso',
      },
      {
        fieldName: 'Gênero',
        fieldProperty: 'genero',
      },
      {
        fieldName: 'Tamanho da Camisa',
        fieldProperty: 'tamanho_camisa',
      },
      {
        fieldName: 'Número de Atividades',
        fieldProperty: 'numero_atividades',
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
