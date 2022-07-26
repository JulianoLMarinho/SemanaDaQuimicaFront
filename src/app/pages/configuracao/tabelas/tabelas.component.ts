import { Component } from '@angular/core';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';
import { TabelasObject } from 'src/app/shared/models/tabelas-exportacao';
import { TableUtil } from 'src/app/shared/utils/table-utils';
import { AtividadesTotaisService } from './services/atividades-totais.service';
import { InscricoesPorAtividadeService } from './services/inscricoes-por-atividade.service';
import { InscricoesPorEdicaoService } from './services/inscricoes-por-edicao.service';

@Component({
  selector: 'app-tabelas',
  templateUrl: './tabelas.component.html',
  styleUrls: ['./tabelas.component.scss'],
})
export class TabelasComponent {
  filterExpanded = false;
  reloadTable = false;
  tabelas = [
    this.inscricoesPorAtividadeService.tabela,
    this.inscricoesPorEdicaoService.tabela,
    this.totaisAtividadesService.tabela,
  ];

  tabelaSelecionada: any;

  constructor(
    private inscricoesPorAtividadeService: InscricoesPorAtividadeService,
    private inscricoesPorEdicaoService: InscricoesPorEdicaoService,
    private totaisAtividadesService: AtividadesTotaisService,
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
