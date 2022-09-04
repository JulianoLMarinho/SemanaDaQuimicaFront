import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { InscricaoService } from '../../../services/inscricao.service';
import { ModalConfirmacaoComponent } from '../../../shared/components/modal-confirmacao/modal-confirmacao.component';
import { Inscricao } from '../../../shared/models/inscricao';
import {
  StatusInscricao,
  StatusInscricaoLabel,
} from '../../../shared/models/statusInscricao';

@Component({
  selector: 'app-confirmar-inscricoes',
  templateUrl: './confirmar-inscricoes.component.html',
  styleUrls: ['./confirmar-inscricoes.component.scss'],
})
export class ConfirmarInscricoesComponent implements OnInit {
  inscricoes: Inscricao[] = [];
  inscricaoPagamento!: Inscricao;
  loadingCancelamento = false;
  loadingSalvar = false;

  constructor(
    private inscricaoService: InscricaoService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private toast: ToastrService,
    public coresEdicao: CoresEdicaoService
  ) {}

  ngOnInit() {
    this.carregarInscricoes();
  }

  carregarInscricoes() {
    this.inscricaoService
      .obterInscricoesConfirmacao()
      .subscribe((inscricoes) => {
        this.inscricoes = inscricoes;
        this.inscricoes.map((x) => {
          x.status_nome = this.getStatusName(x.status);
        });
      });
  }

  getStatusName(status: StatusInscricao) {
    return StatusInscricaoLabel[status];
  }

  abrirInscricao(inscricao: Inscricao) {
    if (!(!inscricao.atividades || inscricao.atividades.length === 0)) return;
    inscricao.carregandoAtividades = true;
    this.inscricaoService
      .obterAtividadesInscricaoUsuario(inscricao.id)
      .subscribe((atividades) => {
        inscricao.atividades = atividades;
        inscricao.carregandoAtividades = false;
      });
  }

  confirmarInscricao(modal: any) {
    this.loadingSalvar = true;
    this.inscricaoService
      .confirmarInscricao(this.inscricaoPagamento.id)
      .subscribe({
        next: (_) => {
          this.carregarInscricoes();
          this.modalService.dismissAll();
          this.toast.success('Inscrição confirmada!');
        },
        error: (_) => {
          this.toast.error('Houve algum erro!');
        },
        complete: () => {
          this.loadingSalvar = false;
        },
      });
  }

  openModal(modal: any, inscricao: Inscricao) {
    this.inscricaoPagamento = inscricao;
    this.modalService.open(modal, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  cancelarInscricao(inscricao: Inscricao) {
    const cancelarInscricaoModal = this.modalService.open(
      ModalConfirmacaoComponent,
      { ariaLabelledBy: 'modal-basic-title' }
    );

    cancelarInscricaoModal.componentInstance.titulo = 'Confirmar cancelamento';
    cancelarInscricaoModal.componentInstance.mensagem =
      'Deseja cancelar esta inscrição?';

    cancelarInscricaoModal.componentInstance.salvar = () => {
      this.loadingCancelamento = true;
      this.inscricaoService.cancelarInscricao(inscricao.id).subscribe((_) => {
        this.toast.success('Inscrição cancelada com sucesso');
        this.carregarInscricoes();
        cancelarInscricaoModal.dismiss();
      });
    };
  }

  fecharModal(modal: any) {
    modal.dismiss();
  }
}
