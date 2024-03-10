import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
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
    // throw new Error('Method not implemented.');
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
        fieldName: 'Número da Edição',
        fieldInitialValue: edicaoAtividade?.numero_edicao,
        fieldProperty: 'numero_edicao',
        fieldType: 'number',
        fieldPlaceholder: 'Insira o número da edição',
        fieldErrorMessage: 'É necessário inserir um número maior do que 0',
        fieldValidators: [Validators.required, Validators.min(1)],
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
        fieldName: 'Semana Ativa',
        fieldInitialValue: edicaoAtividade?.ativa,
        fieldProperty: 'ativa',
        fieldType: 'select',
        fieldPlaceholder: '',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldOptions: [
          { name: 'Sim', value: true },
          { name: 'Não', value: false },
        ],
        fieldDisplayFormatter: (args: EdicaoSemana) =>
          args.ativa ? 'Sim' : 'Não',
        fieldOptionChange: (event: any) => {
          event &&
            this.toastService.info(
              'Ao alterar esta opção para "Sim", todas as outras edições terão este campo alterado para "Não". É possível ter apenas uma edição ativa.',
              'Atenção',
              { closeButton: true, timeOut: 50000 }
            );
        },
      },
    ];
  }

  salvarEdicao(formValues: any) {
    if (formValues.id) {
      const e = this.edicoes.find((x) => x.id === formValues.id);
      if (e?.ativa) {
        this.toastService.error(
          'Não é possível desativar uma semana já ativa.'
        );
        return throwError(
          () => new Error('Não é possível desativar uma semana já ativa.')
        );
      }
    }
    return this.edicaoServices.editarEdicaoSemana(formValues);
  }

  comissaoFormatter(edicao: EdicaoSemana) {
    return edicao.comissao_edicao && edicao.comissao_edicao.length
      ? edicao.comissao_edicao.map((x) => x.nome_responsavel).join(', ')
      : 'Responsável não cadastrado';
  }

  loadComissao(): Observable<OpcaoSelect[]> {
    return this.responsavelService.getReponsaveis('comissao');
  }
}
