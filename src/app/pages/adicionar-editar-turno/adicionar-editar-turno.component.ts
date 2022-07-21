import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AtividadesService } from '../../services/atividades.service';
import { ResponsavelService } from '../../services/responsavel.service';
import { TurnoService } from '../../services/turno.service';
import { TipoAtividade } from '../../shared/models/atividades';
import { EdicaoSemana } from '../../shared/models/edicao-semana';
import { Responsavel } from '../../shared/models/responsavel';
import { Turno } from '../../shared/models/turno';

@Component({
  selector: 'app-adicionar-editar-turno',
  templateUrl: './adicionar-editar-turno.component.html',
  styleUrls: ['./adicionar-editar-turno.component.scss'],
})
export class AdicionarEditarTurnoComponent implements OnInit {
  turno: any = {
    nome_turno: '',
    dias_semana: [],
    hora_inicio: null,
    hora_fim: null,
    edicao_semana_id: null,
    horarios: [],
  };
  edicaoSemana!: EdicaoSemana;
  groupControl = new UntypedFormGroup({
    horInicio: new UntypedFormControl(this.turno.hora_inicio, [Validators.required]),
    horFim: new UntypedFormControl(this.turno.hora_fim, [Validators.required]),
    nome_turno: new UntypedFormControl(this.turno.nome_turno, [Validators.required]),
  });
  saving = false;

  @Output() saved = new EventEmitter();

  constructor(
    private turnoService: TurnoService,
    private toastService: ToastrService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.turno.edicao_semana_id = this.edicaoSemana.id;
  }

  salvarTurno() {
    this.groupControl.markAllAsTouched();

    if (this.groupControl.invalid) return;
    const formValues = this.groupControl.getRawValue();
    this.saving = true;
    const turnoSave = {
      nome_turno: formValues.nome_turno,
      dias_semana: this.turno.dias_semana,
      hora_inicio: formValues.horInicio,
      hora_fim: formValues.horFim,
      edicao_semana_id: this.edicaoSemana.id,
      horarios: [],
    };
    turnoSave.horarios = turnoSave.dias_semana.map((x: any) => {
      return {
        hora_inicio: turnoSave.hora_inicio,
        hora_fim: turnoSave.hora_fim,
        dia: x,
      };
    });
    this.turnoService.criarTurno(turnoSave).subscribe(
      (ret) => {
        if (ret) {
          this.toastService.success('O turno foi criado com sucesso');
          this.saved.emit();
        } else {
          this.toastService.error('Um erro ocorreu ao salvar o turno');
        }
        this.saving = false;
      },
      (error) => {
        this.saving = false;
        this.toastService.error('Um erro ocorreu ao salvar o turno');
      }
    );
  }

  closeModal() {
    this.activeModal.close();
  }
}
