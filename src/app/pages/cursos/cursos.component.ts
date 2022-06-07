import { Component, OnInit } from '@angular/core';
import { AtividadesService } from '../../services/atividades.service';
import { EdicaoSemanaService } from '../../services/edicaoSemana.service';
import * as moment from 'moment';
import { AtividadeTurno } from '../../shared/models/atividades';
import { EdicaoSemana } from '../../shared/models/edicao-semana';
import { DiaHoraAtividade } from '../../shared/models/diaHora';
import { CoresEdicaoService } from '../../services/coresEdicao.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  atividades: AtividadeTurno[] = [];
  edicaoSemana!: EdicaoSemana;
  weekDay = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  loading = true;

  constructor(
    private atividadesService: AtividadesService,
    public coresEdicao: CoresEdicaoService,
    private edicaoService: EdicaoSemanaService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.edicaoService.getDetalhes().subscribe((edicao) => {
      this.edicaoSemana = edicao;
      this.carregarCursos();
    });
  }

  carregarCursos() {
    this.atividadesService
      .getAtividadesByEdicaoTurnoAndTipo(this.edicaoSemana.id, 'CURSO')
      .subscribe(
        (atividadesTurnos) => {
          this.atividades = atividadesTurnos;
          this.atividades.map((x) => {
            let duration = 0;
            let startDisplay = '';
            let endDisplay = '';
            x.turno.horarios.map((y) => {
              const start = moment('2000-01-01T' + y.hora_inicio);
              const end = moment('2000-01-01T' + y.hora_fim);
              startDisplay = start.format('hh[h]mm');
              endDisplay = end.format('hh[h]mm');
              duration += end.diff(start);
            });
            x.turno.hor_inicio = startDisplay;
            x.turno.hor_fim = endDisplay;
            x.turno.duracao = moment.duration(duration).hours();
          });
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  getWeekString(dias: DiaHoraAtividade[]): string {
    let texto = ' ';
    for (let dia = 0; dia < dias.length; dia++) {
      if (dia === 0) texto += '';
      else if (dia < dias.length - 1 && dia > 0) texto += ', ';
      else texto += ' e ';

      texto += this.weekDay[dias[dia].dia];
    }
    return texto;
  }
}
