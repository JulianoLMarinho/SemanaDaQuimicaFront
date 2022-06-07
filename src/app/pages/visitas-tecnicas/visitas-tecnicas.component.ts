import { Component, OnInit } from '@angular/core';
import { AtividadesService } from '../../services/atividades.service';
import { EdicaoSemanaService } from '../../services/edicaoSemana.service';
import { StyleService } from '../../services/style.service';
import { AtividadeLista } from '../../shared/models/atividades';
import { EdicaoSemana } from '../../shared/models/edicao-semana';

@Component({
  selector: 'app-visitas-tecnicas',
  templateUrl: './visitas-tecnicas.component.html',
  styleUrls: ['./visitas-tecnicas.component.scss'],
})
export class VisitasTecnicasComponent implements OnInit {
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
      .getAtividadesByEdicaoAndTipo(this.edicaoSemana.id, 'VISITA_TECNICA')
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
