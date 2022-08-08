import { Component, OnInit } from '@angular/core';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { EdicaoSemana } from '../../models/edicao-semana';

@Component({
  selector: 'app-em-construcao',
  templateUrl: './em-construcao.component.html',
  styleUrls: ['./em-construcao.component.scss'],
})
export class EmConstrucaoComponent implements OnInit {
  edicaoSemana: EdicaoSemana;
  constructor(private edicaoSemanaService: EdicaoSemanaService) {
    this.edicaoSemana = this.edicaoSemanaService.semanaAtiva;
  }

  ngOnInit() {}
}
