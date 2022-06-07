import { Component, OnInit } from '@angular/core';
import { AtividadesService } from '../../services/atividades.service';
import { EdicaoSemanaService } from '../../services/edicaoSemana.service';
import { StyleService } from '../../services/style.service';
import { AtividadeLista } from '../../shared/models/atividades';
import { EdicaoSemana } from '../../shared/models/edicao-semana';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
})
export class WorkshopsComponent implements OnInit {
  atividades: AtividadeLista[] = [];
  edicaoSemana!: EdicaoSemana;
  loading = true;

  primaryColor: string;
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
      this.carregarCursos();
    });
  }

  carregarCursos() {
    this.atividadesService
      .getAtividadesByEdicaoAndTipo(this.edicaoSemana.id, 'WORKSHOP')
      .subscribe(
        (atividades) => {
          this.atividades = atividades;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
