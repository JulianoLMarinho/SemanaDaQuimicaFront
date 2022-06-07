import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss'],
})
export class ModalConfirmacaoComponent implements OnInit {
  @Input()
  titulo!: string;

  @Input() mensagem: string = 'Deseja deletar este item?';
  @Input() salvar!: () => {};

  loading = false;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  salvarAction() {
    this.loading = true;
    this.salvar();
  }

  cancelarAction() {
    this.activeModal.dismiss();
  }
}
