import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { TurnoService } from '../../../services/turno.service';
import { ModalFieldConfiguration } from '../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { EdicaoSemana } from '../../../shared/models/edicao-semana';
import { Turno } from '../../../shared/models/turno';
import { DiaHoraAtividade } from '../../../shared/models/diaHora';
import { AdicionarEditarTurnoComponent } from '../../adicionar-editar-turno/adicionar-editar-turno.component';
import { DiaHora } from '../../../shared/components/dias-semana-select/dia-hora';
import { BaseConfiguracaoComponent } from '../base-configuracao/base-configuracao.component';
import { AppUtils } from '../../../shared/utils';

@Component({
  selector: 'app-turno-configuracao',
  templateUrl: './turno-configuracao.component.html',
  styleUrls: ['./turno-configuracao.component.scss'],
})
export class TurnoConfiguracaoComponent extends BaseConfiguracaoComponent {
  colunas = [
    {
      nome: 'Nome',
      propriedade: 'nome_turno',
    },
    {
      nome: 'Edição',
      propriedade: 'edicao_semana_id',
    },
  ];
  displayedColumns: string[] = this.colunas.map((x) => x.propriedade);
  loading = true;

  dataSource = new MatTableDataSource<Turno>();
  data: Turno[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    edicaoService: EdicaoSemanaService,
    toastService: ToastrService,
    private turnoService: TurnoService,
    private modalService: NgbModal
  ) {
    super(edicaoService, toastService);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEntidade(): void {
    this.loadTurnos();
  }

  loadTurnos() {
    if (this.edicaoSelecionada) {
      this.dataSource.data = [];
      this.loading = true;
      this.turnoService
        .getTurnosByEdicao(this.edicaoSelecionada.id)
        .subscribe((turnos) => {
          this.data = turnos;
          this.loading = false;
        });
    }
  }

  adicionarAtividade() {
    const activeModal = this.modalService.open(AdicionarEditarTurnoComponent, {
      centered: true,
      ariaDescribedBy: 'modal-basic-title',
    });

    activeModal.componentInstance.edicaoSemana = this.edicaoSelecionada;
    activeModal.componentInstance.saved.subscribe(() => {
      this.loadTurnos();
      activeModal.close();
    });
  }

  obterModelo(turnoEdit?: Turno): ModalFieldConfiguration[] {
    return [
      this.getIdField(turnoEdit),
      {
        fieldName: 'Turno',
        fieldInitialValue: turnoEdit?.nome_turno,
        fieldProperty: 'nome_turno',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o nome do Turno',
        fieldErrorMessage: 'É necessário inserir um nome',
        fieldValidators: [Validators.required],
        tableStyle: {
          width: '20%',
          flex: 'none',
        },
      },
      {
        fieldName: 'Dia da Semana',
        fieldInitialValue: AppUtils.obterDiaHoraEdit(turnoEdit?.horarios),
        fieldProperty: 'dia',
        fieldType: 'dayHour',
        fieldErrorMessage: '',
        fieldValidators: [Validators.required],
        fieldDisplayFormatter: this.diasFormatter,
        tableStyle: {
          width: '70%',
          'white-space': 'nowrap',
        },
      },
    ];
  }

  diasFormatter(turno: Turno) {
    const o = turno.horarios!.map((x) => {
      switch (x.dia) {
        case 1:
          return 'seg';
        case 2:
          return 'ter';
        case 3:
          return 'qua';
        case 4:
          return 'qui';
        case 5:
          return 'sex';
        default:
          return '';
      }
    });
    let ret = '';

    for (const { index, value } of o.map((value, index) => ({
      index,
      value,
    }))) {
      if (index === o.length - 2) {
        ret += value + ' e ';
      } else if (index === o.length - 1) {
        ret += value;
      } else {
        ret += value + ', ';
      }
    }
    if (turno && turno.horarios && turno.horarios.length > 0) {
      ret +=
        ' das ' +
        moment('2022-01-01T' + turno.horarios[0].hora_inicio + '-0300').format(
          'hh:mm A'
        ) +
        ' até às ' +
        moment('2022-01-01T' + turno.horarios[0].hora_fim + '-0300').format(
          'hh:mm A'
        );
    }
    return ret;
  }

  convertIntDia(dia: number): string {
    switch (dia) {
      case 1:
        return 'seg';
      case 2:
        return 'ter';
      case 3:
        return 'qua';
      case 4:
        return 'qui';
      case 5:
        return 'sex';
      default:
        return '';
    }
  }

  salvarTurno(formValues: any): Observable<boolean> {
    const turnoSave = {
      id: formValues.id,
      nome_turno: formValues.nome_turno,
      edicao_semana_id: this.edicaoSelecionada!.id,
      horarios: [],
    };
    turnoSave.horarios = formValues.dia.diasSelecionado.map((x: any) => {
      return {
        hora_inicio: formValues.dia.hora_inicio,
        hora_fim: formValues.dia.hora_fim,
        dia: x,
      };
    });
    return this.turnoService.criarTurno(turnoSave);
  }
}
