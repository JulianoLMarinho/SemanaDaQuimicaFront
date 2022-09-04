import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { AtividadesService } from '../../services/atividades.service';
import { EdicaoSemanaService } from '../../services/edicaoSemana.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Atividade, AtividadeLista } from '../../shared/models/atividades';
import { InscricaoService } from '../../services/inscricao.service';
import { AtividadeInscricao } from '../../shared/models/inscricao';
import { ToastrService } from 'ngx-toastr';
import { CoresEdicaoService } from '../../services/coresEdicao.service';
import { EdicaoSemana } from '../../shared/models/edicao-semana';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.scss'],
})
export class InscricaoComponent implements OnInit {
  atividades: AtividadeLista[] = [];
  viewDate: Date = new Date();
  events: CalendarEvent<boolean>[] = [];
  refresh = new Subject<void>();
  atividadesInscritas: AtividadeInscricao[] = [];
  valor: number = 0;
  descontoAcumulo: number = 0;
  salvando = false;
  semanaAtiva: EdicaoSemana;
  editando = false;
  camisaEdicao = false;
  cotistaOuSBQ = false;
  valorCamisa = 37;
  camisaJaSelecionada = false;
  confirmarPagamento = false;

  constructor(
    private atividadeService: AtividadesService,
    private semanaEdicaoService: EdicaoSemanaService,
    private authService: AuthenticationService,
    private inscricaoService: InscricaoService,
    private toast: ToastrService,
    public coresEdicao: CoresEdicaoService,
    private modalService: NgbModal
  ) {
    this.viewDate = new Date(this.semanaEdicaoService.semanaAtiva.data_inicio);
    this.semanaAtiva = this.semanaEdicaoService.semanaAtiva;
  }

  ngOnInit() {
    this.carregarAtividades();
  }

  carregarAtividades() {
    this.atividadeService
      .getAtividadesByEdicaoInscricao(this.semanaEdicaoService.semanaAtiva.id)
      .subscribe((atividades) => {
        this.atividades = atividades;
        this.carregarAtividadesUsuario();
      });
  }

  adicionarEvento(atividade: AtividadeLista, deletavel = true) {
    if (
      !this.semanaEdicaoService.semanaAtiva.aceita_inscricao_atividade &&
      deletavel
    ) {
      this.toast.info('A edição não está aceitando inscrições no momento');
      return;
    }
    if (atividade.vagas! - atividade.total_inscritos! < 1 && deletavel) {
      this.toast.info(
        'Esta atividade atingiu o número máximo de inscritos e não pode aceitar mais inscrições'
      );
      return;
    }
    const eventosNaoDeletaveis = this.events.filter((x) => x.meta === false);
    if (eventosNaoDeletaveis.some((x) => x.id === atividade.id)) {
      this.toast.info(
        'Este evento faz parte de outra inscrição ativa e não pode ser removido',
        'Este evento não pode ser removido',
        { closeButton: true, timeOut: 10000 }
      );
      return;
    }
    if (this.events.some((x) => x.id === atividade.id)) {
      atividade.selecionada = false;
      this.events = this.events.filter((x) => x.id !== atividade.id);
    } else {
      atividade.selecionada = true;
      if (atividade.horarios) {
        for (let hor of atividade.horarios) {
          const startString = moment(
            this.semanaEdicaoService.semanaAtiva.data_inicio
          )
            .add(hor.dia - 1, 'days')
            .format('yyyy-MM-DD');
          this.events.push({
            id: atividade.id,
            start: new Date(startString + 'T' + hor.hora_inicio + '-0300'),
            end: new Date(startString + 'T' + hor.hora_fim + '-0300'),
            title: atividade.titulo,
            color: {
              primary: '#ad2121',
              secondary: '#FAE3E3',
            },
            meta: deletavel,
          });
        }
      }
    }
    const valorTotal = this.atividades
      .filter(
        (x) =>
          x.selecionada &&
          this.events.filter((z) => z.meta !== false).some((z) => z.id === x.id)
      )
      .map((x) => x.valor)
      .reduce(
        (partialSum, a) => (partialSum ? partialSum : 0) + (a ? a : 0),
        0
      );
    const totalAtividades = this.atividades.filter(
      (x) =>
        x.selecionada &&
        this.events.filter((z) => z.meta !== false).some((z) => z.id === x.id)
    ).length;
    this.valor = valorTotal ? valorTotal : 0;
    this.descontoAcumulo = 5 * (totalAtividades - 1);
    this.haAtividades(false);
    this.refresh.next();
  }

  carregarAtividadesUsuario() {
    this.inscricaoService
      .obterAtividadesInscricao(this.authService.usuarioLogado!.id)
      .subscribe((atividadesIds) => {
        this.atividadesInscritas = atividadesIds;
        this.camisaJaSelecionada = this.atividadesInscritas.some(
          (x) => x.camisa_kit === true
        );
        this.events = [];
        for (let atividade of this.atividades.filter((x) =>
          this.atividadesInscritas.some((y) => y.atividade_id === x.id)
        )) {
          atividade.ja_salvo = true;
          this.adicionarEvento(atividade, false);
        }
      });
  }

  abrirModalInscricao(modal: any) {
    if (!this.haAtividades()) return;
    if (this.existeHorarioSobreposto()) return;
    const modalInstance = this.modalService.open(modal);
  }

  salvarInscricao(modal: any) {
    if (!this.confirmarPagamento) {
      this.toast.info(
        'Você precisa confirmar que leu as instruções para o pagamento da sua inscrição.'
      );
      return;
    }
    this.salvando = true;
    const usuario = this.authService.usuarioLogado!;
    const saveOjb = {
      edicao_semana_id: this.semanaEdicaoService.semanaAtiva.id,
      usuario_id: usuario.id,
      valor:
        this.valor -
        this.descontoAcumulo +
        this.valorCamisa * (this.camisaEdicao ? 1 : 0) -
        (this.valor - this.valor * 0.9) * (this.cotistaOuSBQ ? 1 : 0),
      status: 'AGUARDANDO_PAGAMENTO',
      camisa_kit: this.camisaEdicao,
      cotista_sbq: this.cotistaOuSBQ,
      atividades: [
        ...new Set(this.events.filter((x) => x.meta === true).map((x) => x.id)),
      ],
    };

    this.inscricaoService.criarInscricao(saveOjb).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.toast.error('Não há mais vagas em uma ou mais atividades.');
          res.forEach((e) => {
            this.toast.error(e);
          });
        } else {
          this.toast.success('Inscrição salva com sucesso');
          modal.dismiss();
        }
        this.carregarAtividades();
      },
      error: (_) => {
        this.toast.error('Houve algum erro e a inscrição não foi salva.');
      },
      complete: () => {
        this.salvando = false;
      },
    });
  }

  existeHorarioSobreposto(): boolean {
    this.events.sort((a, b) => {
      if (a.start.getTime() < b.start.getTime()) return 1;
      else return -1;
    });

    const horarioSobreposto = this.events.some((x) => {
      return this.events.some((y) => {
        if (x.id === y.id) return false;
        return (
          (x.start.getTime() >= y.start.getTime() &&
            x.start.getTime() < y.end!.getTime()) ||
          (x.end!.getTime() > y.start.getTime() &&
            x.end!.getTime() <= y.end!.getTime())
        );
      });
    });

    if (horarioSobreposto) {
      this.toast.error(
        'Não é possível salvar inscrição com horário sobreposto',
        'Horário sobreposto',
        { timeOut: 10000 }
      );
    }
    return horarioSobreposto;
  }

  haAtividades(showToast = true) {
    const novasAtividades = this.events.some((x) => x.meta === true);
    if (!novasAtividades) {
      showToast &&
        this.toast.info('Não existem novas atividades a serem salvas');
      this.editando = false;
    } else {
      this.editando = true;
    }
    return novasAtividades;
  }

  cancelar(modal: any) {
    this.events = this.events.filter((x) => x.meta === false);
    this.atividades.map((x) => {
      x.selecionada = this.events.some((y) => y.id === x.id);
    });
    this.editando = false;
    this.camisaEdicao = false;
    this.cotistaOuSBQ = false;
    this.descontoAcumulo = 0;
    this.valor = 0;
    modal.dismiss();
  }
}
