import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { ResponsavelService } from '../../../services/responsavel.service';
import { ModalFieldConfiguration } from '../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { OpcaoSelect } from '../../../shared/models/atividades';
import { EdicaoSemana } from '../../../shared/models/edicao-semana';
import { BaseConfiguracaoComponent } from '../base-configuracao/base-configuracao.component';

@Component({
  selector: 'app-gerenciar-edicao',
  templateUrl: './gerenciar-edicao.component.html',
  styleUrls: ['./gerenciar-edicao.component.scss'],
})
export class GerenciarEdicaoComponent extends BaseConfiguracaoComponent {
  loadEntidade(): void {
    throw new Error('Method not implemented.');
  }
  edicoesLista: EdicaoSemana[] = [];
  loadingEdicoes: boolean = false;
  edicaoServices: EdicaoSemanaService;

  constructor(
    edicaoService: EdicaoSemanaService,
    toastService: ToastrService,
    private responsavelService: ResponsavelService
  ) {
    super(edicaoService, toastService);
    this.edicaoServices = edicaoService;
  }

  obterModelo(edicaoAtividade: EdicaoSemana): ModalFieldConfiguration[] {
    return [
      this.getIdField(edicaoAtividade),
      {
        fieldName: 'Tema',
        fieldInitialValue: edicaoAtividade?.tema,
        fieldProperty: 'tema',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o tema',
        fieldErrorMessage: 'É necessário inserir o tema',
        fieldValidators: [Validators.required],
      },
      {
        fieldName: 'Início',
        fieldInitialValue: edicaoAtividade?.data_inicio,
        fieldProperty: 'data_inicio',
        fieldType: 'date',
        fieldPlaceholder: 'Insira a data de início',
        fieldErrorMessage: 'É necessário inserir a data',
        fieldValidators: [Validators.required],
        fieldDisplayFormatter: (args: EdicaoSemana) =>
          moment(args.data_inicio).format('DD/MM/yyyy'),
      },
      {
        fieldName: 'Fim',
        fieldInitialValue: edicaoAtividade?.data_fim,
        fieldProperty: 'data_fim',
        fieldType: 'date',
        fieldPlaceholder: 'Insira a data de início',
        fieldErrorMessage: 'É necessário inserir a data',
        fieldValidators: [Validators.required],
        fieldDisplayFormatter: (args: EdicaoSemana) =>
          moment(args.data_fim).format('DD/MM/yyyy'),
      },
      {
        fieldName: 'Quem Somos',
        fieldInitialValue: edicaoAtividade?.quem_somos,
        fieldProperty: 'quem_somos',
        fieldType: 'textArea',
        fieldPlaceholder: "Insira o texto para a tela 'Quem Somos'",
        fieldErrorMessage: 'É necessário inserir o texto',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Comissão',
        fieldInitialValue: edicaoAtividade?.comissao_edicao?.map((x) => x.id),
        fieldProperty: 'comissao_edicao',
        fieldType: 'selectFilter',
        fieldPlaceholder: 'Selecione o integrante da comissão',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldOptions: [],
        fieldOptionsFiltered: [],
        fieldShowOnTable: false,
        fieldDisplayFormatter: this.comissaoFormatter,
        fieldLoadOptionsService: this.loadComissao.bind(this),
      },
    ];
  }

  salvarEdicao(formValues: any) {
    formValues.ativa = true;
    return this.edicaoServices.editarEdicaoSemana(formValues);
  }

  comissaoFormatter(edicao: EdicaoSemana) {
    return edicao.comissao_edicao && edicao.comissao_edicao.length
      ? edicao.comissao_edicao.map((x) => x.nome_responsavel).join(', ')
      : 'Responsável não cadastrado';
  }

  loadComissao(): Observable<OpcaoSelect[]> {
    return this.responsavelService.getReponsaveis();
  }
}