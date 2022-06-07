import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { AtividadesService } from '../../services/atividades.service';
import { EdicaoSemanaService } from '../../services/edicaoSemana.service';
import { Atividade, AtividadeLista } from '../../shared/models/atividades';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.scss'],
})
export class InscricaoComponent implements OnInit {
  atividades: AtividadeLista[] = [];
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh = new Subject<void>();

  constructor(
    private atividadeService: AtividadesService,
    private semanaEdicaoService: EdicaoSemanaService
  ) {
    this.viewDate = new Date(this.semanaEdicaoService.semanaAtiva.data_inicio);
  }

  ngOnInit() {
    this.atividadeService
      .getAtividadesByEdicaoInscricao(this.semanaEdicaoService.semanaAtiva.id)
      .subscribe((atividades) => {
        this.atividades = atividades;
      });
  }

  adicionarEvento(atividade: AtividadeLista) {
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
          });
        }
      }
    }
    this.refresh.next();
  }
}
