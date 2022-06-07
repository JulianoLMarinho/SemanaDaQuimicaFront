import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-adicionar-editar-atividade',
  templateUrl: './adicionar-editar-atividade.component.html',
  styleUrls: ['./adicionar-editar-atividade.component.scss'],
})
export class AdicionarEditarAtividadeComponent implements OnInit {
  atividade: any = {
    titulo: '',
    descricao_atividade: '',
    tipo_atividade: null,
    responsavel_atividade: null,
    vagas: 0,
    dias_semana: [],
    hora_inicio: null,
    hora_fim: null,
    edicao_semana_id: null,
    ativa: true,
    horarios: [],
    turno_atividade: null,
  };
  tiposAtividade: TipoAtividade[] = [];
  turnoAtividade: Turno[] = [];
  responsaveis: Responsavel[] = [];
  responsaveisFiltrados: Responsavel[] = [];
  edicaoSemana!: EdicaoSemana;
  groupControl = new FormGroup({
    titulo: new FormControl(this.atividade.titulo, [Validators.required]),
    descricao: new FormControl(this.atividade.descricao_atividade, [
      Validators.required,
    ]),
    tipoAtividade: new FormControl(this.atividade.tipo_atividade, [
      Validators.required,
    ]),
    responsavelAtividade: new FormControl(
      this.atividade.responsavel_atividade,
      [Validators.required]
    ),
    vagas: new FormControl(this.atividade.vagas, [
      Validators.required,
      Validators.min(1),
    ]),
  });
  saving = false;
  mostrarHorarios: boolean | null = null;

  @Output() saved = new EventEmitter();

  constructor(
    private atividadeService: AtividadesService,
    private responsavelService: ResponsavelService,
    private toastService: ToastrService,
    private activeModal: NgbActiveModal,
    private turnoService: TurnoService
  ) {}

  ngOnInit() {
    this.loadTipoAtividades();
    this.loadReponsaveis();
    this.loadTurnos();
    this.atividade.edicao_semana_id = this.edicaoSemana.id;
  }

  loadTipoAtividades() {
    this.atividadeService.getTipoAtividades().subscribe((tipos) => {
      //this.tiposAtividade = tipos;
    });
  }

  loadReponsaveis() {
    this.responsavelService.getReponsaveis().subscribe((res) => {});
  }

  loadTurnos() {
    this.turnoService
      .getTurnosByEdicao(this.edicaoSemana.id)
      .subscribe((turnos) => {
        this.turnoAtividade = turnos;
      });
  }

  filterResponsaveis(value: any) {
    this.responsaveisFiltrados = this.responsaveis.filter((x) =>
      x.nome_responsavel.toLowerCase().includes(value.value.toLowerCase())
    );
  }

  salvarAtividade() {
    this.groupControl.markAllAsTouched();

    if (this.groupControl.invalid) return;
    const formValues = this.groupControl.getRawValue();
    this.saving = true;

    const atividadeSave = {
      titulo: formValues.titulo,
      descricao_atividade: formValues.descricao,
      tipo_atividade: formValues.tipoAtividade,
      responsavel_atividade: formValues.responsavelAtividade,
      vagas: formValues.vagas,
      dias_semana: this.atividade.dias_semana,
      hora_inicio: formValues.horInicio,
      hora_fim: formValues.horFim,
      edicao_semana_id: this.edicaoSemana.id,
      ativa: true,
      horarios: [],
      turno_atividade: formValues.turnoAtividade,
    };
    atividadeSave.horarios = atividadeSave.dias_semana.map((x: any) => {
      return {
        hora_inicio: atividadeSave.hora_inicio,
        hora_fim: atividadeSave.hora_fim,
        dia: x,
      };
    });
    this.atividadeService.criarEditarAtividade(atividadeSave).subscribe(
      (ret) => {
        if (ret) {
          this.toastService.success('A atividade foi criada com sucesso');
          this.saved.emit();
        } else {
          this.toastService.error('Um erro ocorreu ao salvar a atividade');
        }
        this.saving = false;
      },
      (error) => {
        this.saving = false;
        this.toastService.error('Um erro ocorreu ao salvar a atividade');
      }
    );
  }

  tipoAtividadeChange(idTipoAtividade: number) {
    const tipoAtividade = this.tiposAtividade.find(
      (x) => x.id === idTipoAtividade
    );

    if (
      tipoAtividade?.cod_tipo === 'CURSO' ||
      tipoAtividade?.cod_tipo === 'WORKSHOP'
    ) {
      this.mostrarHorarios = false;
      this.groupControl.addControl(
        'turnoAtividade',
        new FormControl(this.atividade.turno_atividade, [Validators.required])
      );
      this.groupControl.removeControl('horInicio');
      this.groupControl.removeControl('horFim');
    } else {
      this.groupControl.addControl(
        'horInicio',
        new FormControl(this.atividade.hora_inicio, [Validators.required])
      );
      this.groupControl.addControl(
        'horFim',
        new FormControl(this.atividade.hora_fim, [Validators.required])
      );
      this.groupControl.removeControl('turnoAtividade');
      this.atividade.dias_semana = [];
      this.mostrarHorarios = true;
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
