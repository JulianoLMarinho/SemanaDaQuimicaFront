import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
import { CoresEdicaoService } from '../../services/coresEdicao.service';

@Component({
  selector: 'app-como-chegar',
  templateUrl: './como-chegar.component.html',
  styleUrls: ['./como-chegar.component.scss'],
})
export class ComoChegarComponent implements OnInit {
  loading = false;

  linhasOnibus = [
    {
      nome: 'BRT',
      rota: 'Terminal Aroldo Melodia',
      link: 'https://moovitapp.com/index/pt-br/transporte_p%C3%BAblico-BRT_Fund%C3%A3o_Terminal_Aroldo_Melodia-Rio_de_Janeiro-site_25437406-322',
    },
    {
      nome: 'Linha 616',
      rota: 'Del Castilho - Fundão (Integração Com Metrô)',
      link: 'https://moovitapp.com/index/pt-br/transporte_p%C3%BAblico-line-616-Rio_de_Janeiro-322-1243376-29645090-2',
    },
    {
      nome: 'Linha 485',
      rota: 'Penha x Siqueira Campos (via Linha Vermelha / Túnel Santa Bárbara)',
      link: 'http://www.rio.rj.gov.br/c/document_library/get_file?uuid=b0309c30-dcc0-417d-ab74-7d5148d7922b&groupId=91241',
    },
    {
      nome: 'Linha 696',
      rota: 'Praia do Dendê - Méier (Via Av. Brasil)',
      link: 'https://moovitapp.com/index/pt-br/transporte_p%C3%BAblico-line-696-Rio_de_Janeiro-322-1243376-29645233-2',
    },
  ];

  linhasUFRJ = [
    {
      nome: 'Linha 1',
      rota: 'BRT / Estação x Gráfica',
      link: 'https://prefeitura.ufrj.br/index.php/pt/linhas-internas-e-intercampi',
    },
    {
      nome: 'Linha 3',
      rota: 'BRT / Estação x Residência Estudantil',
      link: 'https://prefeitura.ufrj.br/index.php/pt/linhas-internas-e-intercampi',
    },
    {
      nome: 'Linha 4',
      rota: 'BRT / Estação x Parque Tec. / COPPEAD',
      link: 'https://prefeitura.ufrj.br/index.php/pt/linhas-internas-e-intercampi',
    },
    {
      nome: 'Linha 5',
      rota: 'Expresso: CCMN, CT e Letras',
      link: 'https://prefeitura.ufrj.br/index.php/pt/linhas-internas-e-intercampi',
    },
  ];

  comoChegarTexto: SafeHtml = '';
  constructor(
    public coresEdicao: CoresEdicaoService,
    public semanaEdicaoService: EdicaoSemanaService,
    private sanitizer: DomSanitizer
  ) {
    this.comoChegarTexto = sanitizer.bypassSecurityTrustHtml(
      semanaEdicaoService.semanaAtiva.como_chegar || ''
    );
  }

  ngOnInit() {}
}
