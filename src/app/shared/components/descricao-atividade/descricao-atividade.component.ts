import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { StyleService } from '../../../services/style.service';
import { AtividadeLista } from '../../models/atividades';
import { AppUtils } from '../../utils';
import { ResponsavelCardComponent } from '../responsavel-card/responsavel-card.component';

@Component({
  selector: 'app-descricao-atividade',
  templateUrl: './descricao-atividade.component.html',
  styleUrls: ['./descricao-atividade.component.scss'],
})
export class DescricaoAtividadeComponent implements OnInit {
  @Input() atividade!: AtividadeLista;

  constructor(
    public coresEdicao: CoresEdicaoService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  abrirDetalhesResponsavel(responsavel: any) {
    const modal = this.modalService.open(ResponsavelCardComponent, {
      centered: true,
      ariaDescribedBy: 'modal-basic-title',
    });
    modal.componentInstance.responsavel = responsavel;
  }

  imageSanitizer(foto?: string) {
    return foto ? AppUtils.imageSanitizer(foto, this.sanitizer) : null;
  }
}
