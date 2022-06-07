import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { AtividadesService } from '../../services/atividades.service';
import { EdicaoSemanaService } from '../../services/edicaoSemana.service';
import { StyleService } from '../../services/style.service';
import { AtividadeLista } from '../../shared/models/atividades';
import { EdicaoSemana } from '../../shared/models/edicao-semana';

@Component({
  selector: 'app-palestras',
  templateUrl: './palestras.component.html',
  styleUrls: ['./palestras.component.scss'],
})
export class PalestrasComponent implements OnInit {
  atividades: AtividadeLista[] = [];
  edicaoSemana!: EdicaoSemana;
  loading = true;
  viewDate: Date = new Date();
  primaryColor: string;
  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  constructor(
    private atividadesService: AtividadesService,
    private styleService: StyleService,
    private edicaoService: EdicaoSemanaService
  ) {
    this.primaryColor = this.styleService.primary;
  }

  ngOnInit() {
    this.loading = true;
    this.edicaoService.getDetalhes().subscribe((edicao) => {
      this.edicaoSemana = edicao;
      this.viewDate = new Date(this.edicaoSemana.data_inicio);
      this.carregarCursos();
    });
  }

  carregarCursos() {
    this.atividadesService
      .getAtividadesByEdicaoAndTipo(this.edicaoSemana.id, 'PALESTRA')
      .subscribe(
        (atividades) => {
          this.atividades = atividades;
          this.loading = false;
          let startMomentEdicao = moment(this.edicaoSemana.data_inicio);
          let endMomentEdicao = moment(this.edicaoSemana.data_fim);
          for (let evento of this.atividades) {
            if (evento.horarios) {
              for (let hor of evento.horarios) {
                const startString = moment(this.edicaoSemana.data_inicio)
                  .add(hor.dia - 1, 'days')
                  .format('yyyy-MM-DD');
                this.events.push({
                  id: evento.id,
                  start: new Date(
                    startString + 'T' + hor.hora_inicio + '-0300'
                  ),
                  end: new Date(startString + 'T' + hor.hora_fim + '-0300'),
                  title: evento.titulo,
                  color: {
                    primary: '#ad2121',
                    secondary: '#FAE3E3',
                  },
                });
              }
            }
          }
          this.refresh.next();
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
