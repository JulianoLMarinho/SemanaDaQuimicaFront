import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { DiaHora } from './dia-hora';

@Component({
  selector: 'app-dias-semana-select',
  templateUrl: './dias-semana-select.component.html',
  styleUrls: ['./dias-semana-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DiasSemanaSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DiasSemanaSelectComponent),
      multi: true,
    },
  ],
})
export class DiasSemanaSelectComponent
  implements OnInit, ControlValueAccessor, Validator
{
  diasSemana = [
    { sigla: 'S', weekDay: 1, date: new Date(), parsedDate: '' },
    { sigla: 'T', weekDay: 2, date: new Date(), parsedDate: '' },
    { sigla: 'Q', weekDay: 3, date: new Date(), parsedDate: '' },
    { sigla: 'Q', weekDay: 4, date: new Date(), parsedDate: '' },
    { sigla: 'S', weekDay: 5, date: new Date(), parsedDate: '' },
  ];
  moment = moment;
  //@Input() diasSelecionados: number[] = [];
  @Input() diasHora: DiaHora = {};
  @Input() diaInicioReferencia: Date = new Date();

  groupControl = new FormGroup({
    horInicio: new FormControl(null, [Validators.required]),
    horFim: new FormControl(null, [Validators.required]),
  });

  onChange = (_quantity: any) => {};
  onTouch = () => {};

  touched = false;

  constructor(private edicaoService: EdicaoSemanaService) {
    this.diaInicioReferencia = <Date>(
      this.edicaoService.semanaSelecionada?.parsed_data_inicio
    );
  }

  writeValue(obj: DiaHora): void {
    this.diasHora = obj;
    if (!obj || !obj.diasSelecionado) this.diasHora = { diasSelecionado: [] };
    this.groupControl.controls.horInicio.setValue(this.diasHora.hora_inicio);
    this.groupControl.controls.horFim.setValue(this.diasHora.hora_fim);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit() {
    for (let i of this.diasSemana) {
      const day = this.diaInicioReferencia.getDay();
      const diaSemana = this.diasSemana.find((x) => x.weekDay === day);
      if (diaSemana) {
        diaSemana.date = new Date(this.diaInicioReferencia);
        diaSemana.parsedDate = moment(diaSemana.date).format('DD/MM/yyyy');
      }
      this.diaInicioReferencia.setDate(this.diaInicioReferencia.getDate() + 1);
    }
  }

  selecionarDia(dia: any) {
    if (!this.diasHora.diasSelecionado?.includes(dia.weekDay)) {
      this.diasHora.diasSelecionado?.push(dia.weekDay);
    } else {
      this.diasHora.diasSelecionado = this.diasHora.diasSelecionado.filter(
        (x) => x !== dia.weekDay
      );
    }
    this.markAsTouched();
    this.onChange(this.diasHora);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
      this.groupControl.markAllAsTouched();
    }
  }

  horaFimChange(event: any) {
    this.diasHora.hora_fim = event.target.value;
    this.markAsTouched();
    this.onChange(this.diasHora);
  }

  horaInicioChange(event: any) {
    this.diasHora.hora_inicio = event.target.value;
    this.markAsTouched();
    this.onChange(this.diasHora);
  }

  validate(control: AbstractControl): any | null {
    const selected = control.value;
    if (
      !selected ||
      !selected.diasSelecionado ||
      selected.diasSelecionado?.length < 1 ||
      !this.groupControl.valid
    ) {
      return {
        required: true,
      };
    }
    return null;
  }
}
