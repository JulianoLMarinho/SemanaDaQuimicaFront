import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EdicaoSemanaService } from '../../../../services/edicaoSemana.service';
import { InscricaoService } from '../../../../services/inscricao.service';
import { ModalFieldConfiguration } from '../../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { EdicaoSemana } from '../../../../shared/models/edicao-semana';
import { TabelasObject } from '../../../../shared/models/tabelas-exportacao';
import { BaseTabelaService } from './baseTabela.service';

@Injectable({
  providedIn: 'root',
})
export class InscricaoPrimeiroCursoService extends BaseTabelaService {
  public tabela: TabelasObject<any> = {
    nome: 'Primeiro Curso dos Usuários',
    filtros: [
      {
        nome: 'Edição',
        opcoes: this.loadEdicoes.bind(this),
        opcoesLista: [],
        opcaoSelecionada: null,
        loading: false,
        selecionarAcao: this.carregarLista.bind(this),
        opcaoLabel: (edicao: EdicaoSemana) =>
          edicao.parsed_data_inicio.getFullYear() + ' - ' + edicao.tema,
      },
    ],
    loadTabela: this.carregarLista.bind(this),
    dados: [],
    obterModelo: this.obterModelo.bind(this),
    mostrarTabela: false,
    urlDados: 'inscricao/primeiro-curso/',
  };

  constructor(
    private inscricaoService: InscricaoService,
    private toast: ToastrService,
    private edicaoService: EdicaoSemanaService
  ) {
    super();
  }

  carregarLista(tabela: TabelasObject<any>) {
    const edicao = tabela.filtros.find((x: any) => x.nome === 'Edição');

    this.inscricaoService
      .obterListaDados(tabela.urlDados + edicao!.opcaoSelecionada.id)
      .subscribe((res: any[]) => {
        tabela.dados = res;
        tabela.mostrarTabela = false;
        if (res.length > 0) {
          this.modelo = [];
          for (let key of Object.keys(res[0])) {
            this.modelo.push({
              fieldName: key,
              fieldProperty: key,
            });
          }
        }
        tabela.mostrarTabela = true;
      });
  }

  obterModelo(obj: any): ModalFieldConfiguration[] {
    return this.modelo;
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

  obterTabela(urlTabela: string, tituloTabela: string): TabelasObject<any> {
    return {
      nome: tituloTabela,
      filtros: [
        {
          nome: 'Edição',
          opcoes: this.loadEdicoes.bind(this),
          opcoesLista: [],
          opcaoSelecionada: null,
          loading: false,
          selecionarAcao: this.carregarLista.bind(this),
          opcaoLabel: (edicao: EdicaoSemana) =>
            edicao.parsed_data_inicio.getFullYear() + ' - ' + edicao.tema,
        },
      ],
      loadTabela: this.carregarLista.bind(this),
      dados: [],
      obterModelo: this.obterModelo.bind(this),
      mostrarTabela: false,
      urlDados: urlTabela,
    };
  }
}
