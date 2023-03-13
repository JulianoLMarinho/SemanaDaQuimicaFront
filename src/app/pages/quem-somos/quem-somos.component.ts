import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CoresEdicaoService } from '../../services/coresEdicao.service';
import { EdicaoSemanaService } from '../../services/edicaoSemana.service';
import { ResponsavelService } from '../../services/responsavel.service';
import { Responsavel } from '../../shared/models/responsavel';
import { AppUtils } from '../../shared/utils';

@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuemSomosComponent implements OnInit {
  loading = false;
  comissao: Responsavel[] = [];
  quemSomosTexto: string = '';
  edicaoNumero: number = 0;
  constructor(
    private edicaoSemanaService: EdicaoSemanaService,
    private sanitizer: DomSanitizer,
    public coresEdicao: CoresEdicaoService
  ) {}

  ngOnInit() {
    this.loadComissao();
  }

  loadComissao() {
    this.quemSomosTexto = this.edicaoSemanaService.semanaAtiva.quem_somos || '';
    this.edicaoNumero = this.edicaoSemanaService.semanaAtiva.numero_edicao;
    this.comissao = this.edicaoSemanaService.semanaAtiva.comissao_edicao || [];

    this.comissao.map((x) => {
      x.fotoEnc = x.foto
        ? AppUtils.imageSanitizer(x.foto, this.sanitizer)
        : undefined;
    });
  }

  transformQuemSomos() {
    return this.sanitizer.bypassSecurityTrustHtml(this.quemSomosTexto);
  }
}
