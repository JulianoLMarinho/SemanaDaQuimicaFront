import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AtividadesService } from '../../../services/atividades.service';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { ResponsavelService } from '../../../services/responsavel.service';
import { TurnoService } from '../../../services/turno.service';
import { ModalFieldConfiguration } from '../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { AtividadeLista, OpcaoSelect } from '../../../shared/models/atividades';
import { EdicaoSemana } from '../../../shared/models/edicao-semana';
import { AppUtils } from '../../../shared/utils';
import { AdicionarEditarAtividadeComponent } from '../../adicionar-editar-atividade/adicionar-editar-atividade.component';
import { BaseConfiguracaoComponent } from '../base-configuracao/base-configuracao.component';

@Component({
  selector: 'app-atividade-configuracao',
  templateUrl: './atividade-configuracao.component.html',
  styleUrls: ['./atividade-configuracao.component.scss'],
})
export class AtividadeConfiguracaoComponent
  extends BaseConfiguracaoComponent
  implements AfterViewInit
{
  loadingAtividades = true;
  atividades: AtividadeLista[] = [];
  dataSource = new MatTableDataSource<AtividadeLista>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    edicaoService: EdicaoSemanaService,
    toastService: ToastrService,
    private atividadesService: AtividadesService,
    private modalService: NgbModal,
    private responsavelService: ResponsavelService,
    private turnoService: TurnoService
  ) {
    super(edicaoService, toastService);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadEntidade(): void {
    this.loadAtividades();
  }

  responsaveisFormatter(atividade: AtividadeLista) {
    return atividade.responsaveis && atividade.responsaveis.length
      ? atividade.responsaveis.map((x) => x.nome_responsavel).join(', ')
      : 'Responsável não cadastrado';
  }

  loadAtividades() {
    if (this.edicaoSelecionada) {
      this.dataSource.data = [];
      this.loadingAtividades = true;
      this.atividadesService
        .getAtividadesByEdicao(this.edicaoSelecionada.id)
        .subscribe((atividades) => {
          this.loadingAtividades = false;
          atividades = atividades.map((atv) => {
            atv.responsaveisMap = atv.responsaveis?.map(
              (y) => y.nome_responsavel
            );
            return atv;
          });
          this.atividades = atividades;
          this.dataSource.data = atividades;
        });
    }
  }

  adicionarAtividade() {
    const activeModal = this.modalService.open(
      AdicionarEditarAtividadeComponent,
      {
        centered: true,
        ariaDescribedBy: 'modal-basic-title',
      }
    );

    activeModal.componentInstance.edicaoSemana = this.edicaoSelecionada;
    activeModal.componentInstance.saved.subscribe(() => {
      this.loadAtividades();
      activeModal.close();
    });
  }

  obterModelo(edicaoAtividade: AtividadeLista): ModalFieldConfiguration[] {
    return [
      this.getIdField(edicaoAtividade),
      {
        fieldName: 'Título',
        fieldInitialValue: edicaoAtividade?.titulo,
        fieldProperty: 'titulo',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o título',
        fieldErrorMessage: 'É necessário inserir um título',
        fieldValidators: [Validators.required],
      },
      {
        fieldName: 'Descrição',
        fieldInitialValue: edicaoAtividade?.descricao_atividade,
        fieldProperty: 'descricao_atividade',
        fieldType: 'textArea',
        fieldPlaceholder: 'Insira a descrição',
        fieldErrorMessage: 'É necessário inserir uma descrição',
        fieldShowOnTable: false,
        fieldValidators: [Validators.required],
      },
      {
        fieldName: 'Tipo da Atividade',
        fieldInitialValue: edicaoAtividade?.tipo_atividade,
        fieldProperty: 'tipo_atividade',
        fieldType: 'select',
        fieldPlaceholder: 'Selecione o tipo da atividade',
        fieldErrorMessage: 'É necessário selecionar um tipo',
        fieldValidators: [Validators.required],
        fieldOptions: [],
        fieldDisplayFormatter: (atv: AtividadeLista) => atv.nome_tipo || '',
        fieldLoadOptionsService: this.loadTipoAtividades.bind(this),
      },
      {
        fieldName: 'Atividade Presencial',
        fieldInitialValue: edicaoAtividade?.atividade_presencial,
        fieldProperty: 'atividade_presencial',
        fieldType: 'select',
        fieldPlaceholder: 'Selecione se a atividade é presencial ou não',
        fieldErrorMessage: 'É necessário informar se a atividade é presencial',
        fieldValidators: [Validators.required],
        fieldOptions: [
          { name: 'Sim', value: true },
          { name: 'Não', value: false },
        ],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Local da atividade',
        fieldInitialValue: edicaoAtividade?.local,
        fieldProperty: 'local',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o local',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
        fieldVisible: this.showLocal,
      },
      {
        fieldName: 'Link da atividade',
        fieldInitialValue: edicaoAtividade?.link,
        fieldProperty: 'link',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o link da atividade',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
        fieldVisible: this.showLink,
      },
      {
        fieldName: 'Responsáveis',
        fieldInitialValue: edicaoAtividade?.responsaveis?.map((x) => x.id),
        fieldProperty: 'responsaveis',
        fieldType: 'selectFilter',
        fieldPlaceholder: 'Selecione o responsável da atividade',
        fieldErrorMessage: 'É necessário selecionar pelo menos um responsável',
        fieldValidators: [Validators.required],
        fieldOptions: [],
        fieldOptionsFiltered: [],
        fieldShowOnTable: false,
        fieldDisplayFormatter: this.responsaveisFormatter,
        fieldLoadOptionsService: this.loadReponsaveis.bind(this),
      },
      {
        fieldName: 'Vagas',
        fieldInitialValue: edicaoAtividade?.vagas,
        fieldProperty: 'vagas',
        fieldType: 'number',
        fieldShowOnTable: false,
        fieldVisible: this.showVagas,
        fieldErrorMessage: 'A quantidade de vagas precisa ser maior do que 0',
        fieldValidators: [Validators.required, Validators.min(1)],
      },
      {
        fieldName: 'Turno',
        fieldInitialValue: edicaoAtividade?.turno_id,
        fieldProperty: 'turno_atividade',
        fieldType: 'select',
        fieldPlaceholder: 'Selecione o turno da atividade',
        fieldErrorMessage: 'É necessário selecionar um turno',
        fieldValidators: [Validators.required],
        fieldOptions: [],
        fieldShowOnTable: false,
        fieldVisible: this.showTurno,
        fieldLoadOptionsService: this.loadTurnos.bind(this),
      },
      {
        fieldName: 'Dia da Semana',
        fieldInitialValue: AppUtils.obterDiaHoraEdit(edicaoAtividade?.horarios),
        fieldProperty: 'dia',
        fieldType: 'dayHour',
        fieldShowOnTable: false,
        fieldErrorMessage: 'A quantidade de vagas precisa ser maior do que 0',
        fieldValidators: [Validators.required],
        fieldVisible: this.showDiaHora,
      },
      {
        fieldName: 'Aceitando Inscrições',
        fieldInitialValue: edicaoAtividade?.aceita_inscricao,
        fieldProperty: 'aceita_inscricao',
        fieldType: 'select',
        fieldPlaceholder: 'Selecione o turno da atividade',
        fieldErrorMessage: 'É necessário informar se está aceitando inscrições',
        fieldValidators: [Validators.required],
        fieldOptions: [
          { name: 'Sim', value: true },
          { name: 'Não', value: false },
        ],
        fieldShowOnTable: false,
        fieldVisible: this.showAceitaInscricoes,
      },
      {
        fieldName: 'Valor (R$)',
        fieldInitialValue: edicaoAtividade?.valor,
        fieldProperty: 'valor',
        fieldType: 'number',
        fieldPlaceholder: 'Defina o valor da atividade',
        fieldErrorMessage: 'É necessário informar o valor da atividade',
        fieldValidators: [Validators.required],
        fieldShowOnTable: false,
        fieldVisible: this.showAceitaInscricoes,
      },
    ];
  }

  loadTipoAtividades(): Observable<OpcaoSelect[]> {
    return this.atividadesService.getTipoAtividades();
  }

  loadReponsaveis(): Observable<OpcaoSelect[]> {
    return this.responsavelService.getReponsaveis();
  }

  loadTurnos(): Observable<OpcaoSelect[]> {
    return this.turnoService.getTurnosSelecaoByEdicao(
      this.edicaoSelecionada!.id
    );
  }

  showTurno(fieldList: any) {
    const tipoAtividade = fieldList['tipo_atividade'];
    return tipoAtividade === 1;
  }

  showVagas(fieldList: any) {
    const tipoAtividade = fieldList['tipo_atividade'];
    return tipoAtividade !== 2;
  }

  showDiaHora(fieldList: any) {
    const tipoAtividade = fieldList['tipo_atividade'];
    return tipoAtividade && tipoAtividade !== 1;
  }

  showLocal(fieldList: any) {
    return fieldList['atividade_presencial'];
  }

  showLink(fieldList: any) {
    return !fieldList['atividade_presencial'];
  }

  showAceitaInscricoes(fieldList: any) {
    const tipoAtividade = fieldList['tipo_atividade'];
    return tipoAtividade && tipoAtividade !== 2;
  }

  salvarAtividade(formValues: any) {
    const atividadeSave = {
      id: formValues.id ?? null,
      titulo: formValues.titulo,
      descricao_atividade: formValues.descricao_atividade,
      tipo_atividade: formValues.tipo_atividade,
      responsavel_atividade: formValues.responsaveis,
      vagas: formValues.vagas,
      edicao_semana_id: this.edicaoSelecionada!.id,
      ativa: true,
      horarios: [],
      turno_atividade: formValues.turno_atividade,
      valor: formValues.valor,
      atividade_presencial: formValues.atividade_presencial,
      local: formValues.local,
      link: formValues.link,
    };
    if (!atividadeSave.turno_atividade) {
      atividadeSave.horarios = formValues.dia.diasSelecionado.map((x: any) => {
        return {
          hora_inicio: formValues.dia.hora_inicio,
          hora_fim: formValues.dia.hora_fim,
          dia: x,
        };
      });
    }
    return this.atividadesService.criarEditarAtividade(atividadeSave);
  }

  deletarAtividade(atividade: AtividadeLista) {
    return this.atividadesService.deletarAtividade(atividade.id);
  }
}
