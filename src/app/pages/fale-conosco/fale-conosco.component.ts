import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
import { CoresEdicaoService } from '../../services/coresEdicao.service';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.scss'],
})
export class FaleConoscoComponent implements OnInit {
  faleConosco: SafeHtml = '';
  constructor(
    public coresEdicao: CoresEdicaoService,
    private edicaoSemanaService: EdicaoSemanaService,
    private sanitizer: DomSanitizer
  ) {
    this.faleConosco = sanitizer.bypassSecurityTrustHtml(
      edicaoSemanaService.semanaAtiva.fale_conosco || ''
    );
  }

  ngOnInit() {}
}
