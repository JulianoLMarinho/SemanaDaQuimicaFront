import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';
import { EdicaoSemanaService } from '../../services/edicaoSemana.service';
import { ResponsavelService } from '../../services/responsavel.service';
import { Responsavel } from '../../shared/models/responsavel';
import { AppUtils } from '../../shared/utils';

@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.scss'],
})
export class QuemSomosComponent implements OnInit {
  loading = false;
  comissao: Responsavel[] = [];
  quemSomosTexto: string = '';
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
    this.comissao = this.edicaoSemanaService.semanaAtiva.comissao_edicao || [];
    this.comissao.push(...this.comissao);
    this.comissao.push(...this.comissao);

    this.comissao.map((x) => {
      x.fotoEnc = x.foto
        ? AppUtils.imageSanitizer(x.foto, this.sanitizer)
        : undefined;
    });
  }
}
