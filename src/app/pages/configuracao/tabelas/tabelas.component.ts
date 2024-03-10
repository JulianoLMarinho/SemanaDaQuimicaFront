import { Component } from '@angular/core';
import { TabelasObject } from '../../../shared/models/tabelas-exportacao';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { AtividadesTotaisService } from './services/atividades-totais.service';
import { InscricaoPrimeiroCursoService } from './services/inscricao-primeiro-curso.service';
import { InscricoesPorAtividadeService } from './services/inscricoes-por-atividade.service';
import { InscricoesPorEdicaoService } from './services/inscricoes-por-edicao.service';
import { AlunosAtividadesService } from './services/aluno-atividade.service';

@Component({
  selector: 'app-tabelas',
  templateUrl: './tabelas.component.html',
  styleUrls: ['./tabelas.component.scss'],
})
export class TabelasComponent {
  filterExpanded = false;
  reloadTable = false;
  tabelas = [
    this.alunosAtividadesService.tabela,
    this.inscricaoPrimeiroCursoService.obterTabela(
      'inscricao/tamanho-camisas/',
      'Camisas dos Usuários Com Inscrição Confirmada'
    ),
    this.inscricoesPorAtividadeService.tabela,
    this.inscricoesPorEdicaoService.tabela,
    this.inscricaoPrimeiroCursoService.tabela,
    this.totaisAtividadesService.tabela,
  ];

  tableasOrdenadas: TabelasObject<any>[] = [];

  tabelaSelecionada!: TabelasObject<any>;

  constructor(
    private inscricoesPorAtividadeService: InscricoesPorAtividadeService,
    private inscricoesPorEdicaoService: InscricoesPorEdicaoService,
    private totaisAtividadesService: AtividadesTotaisService,
    private inscricaoPrimeiroCursoService: InscricaoPrimeiroCursoService,
    private alunosAtividadesService: AlunosAtividadesService,
    public coresEdicao: CoresEdicaoService
  ) {}

  primeiroFiltro(tabela: any) {
    this.reloadTable = true;
    tabela.filtros[0].opcoes(tabela);
    this.filterExpanded = true;
    setTimeout(() => {
      this.reloadTable = false;
    }, 1000);
  }
}
