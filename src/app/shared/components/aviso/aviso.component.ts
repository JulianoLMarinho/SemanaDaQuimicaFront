import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';
import { Aviso } from '../../models/aviso';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss'],
})
export class AvisoModalComponent implements OnInit {
  @Input()
  aviso!: Aviso;

  loading = false;

  constructor(
    public activeModal: NgbActiveModal,
    public coresEdicao: CoresEdicaoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  cancelarAction() {
    this.activeModal.dismiss();
  }

  transformTexto() {
    return this.sanitizer.bypassSecurityTrustHtml(this.aviso.texto);
  }
}
