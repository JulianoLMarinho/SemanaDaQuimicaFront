import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { ModalFieldConfiguration } from '../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { BaseModel } from '../../../shared/models/baseModel';
import { EdicaoSemana } from '../../../shared/models/edicao-semana';

@Component({
  selector: 'app-base-configuracao',
  templateUrl: './base-configuracao.component.html',
  styleUrls: ['./base-configuracao.component.scss'],
})
export abstract class BaseConfiguracaoComponent implements OnInit {
  edicoes: EdicaoSemana[] = [];
  edicaoSelecionada: EdicaoSemana | null = null;
  loadingEntidade = false;

  constructor(
    public edicaoService: EdicaoSemanaService,
    public toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadEdicoes();
  }

  loadEdicoes() {
    this.edicaoService.getEdicoes().subscribe(
      (edicoes) => {
        this.edicoes = edicoes;
        this.edicaoSelecionada = this.edicoes[0];
        this.selectEdicao();
        this.loadEntidade();
      },
      (error) => {
        this.toastService.error('Não foi possível carregar as edições');
      }
    );
  }

  selectEdicao() {
    this.edicaoService.selecionaSemana(this.edicaoSelecionada!);
  }

  getIdField(entidade?: BaseModel): ModalFieldConfiguration {
    return {
      fieldName: 'ID',
      fieldInitialValue: entidade?.id,
      fieldProperty: 'id',
      fieldType: 'number',
      fieldErrorMessage: '',
      fieldValidators: [],
      fieldShowOnTable: false,
      fieldVisible: () => false,
    };
  }
  abstract loadEntidade(): void;
  abstract obterModelo(entidadeEdicao?: BaseModel): ModalFieldConfiguration[];
}
