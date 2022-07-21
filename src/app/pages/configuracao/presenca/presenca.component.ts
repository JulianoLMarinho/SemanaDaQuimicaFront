import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { interval, Subject } from 'rxjs';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { AtividadesService } from 'src/app/services/atividades.service';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';
import { PresencaService } from 'src/app/services/presenca.service';
import { ModalFieldConfiguration } from 'src/app/shared/components/modal-adicionar-editar/modal-field-configuration';
import { AtividadeLista } from 'src/app/shared/models/atividades';
import { BaseModel } from 'src/app/shared/models/baseModel';
import { Presenca, PresencaItem } from 'src/app/shared/models/presenca';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { BaseConfiguracaoComponent } from '../base-configuracao/base-configuracao.component';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.component.html',
  styleUrls: ['./presenca.component.scss'],
})
export class PresencaComponent extends BaseConfiguracaoComponent {
  atividades: AtividadeLista[] = [];
  atividadeSelecionada!: AtividadeLista;
  headerDias: any[] = [];
  alunosPresenca: Presenca[] = [];
  salvarPresencaRequest = new Subject<PresencaItem>();
  carregandoPresenca = false;

  constructor(
    public edicaoService: EdicaoSemanaService,
    public toastService: ToastrService,
    private atividadesService: AtividadesService,
    public coresEdicao: CoresEdicaoService,
    private presencaService: PresencaService
  ) {
    super(edicaoService, toastService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.salvarPresencaRequest
      .pipe(
        debounceTime(500),
        mergeMap((presencaItem: PresencaItem) => {
          return this.presencaService.salvarPresenca(presencaItem);
        })
      )
      .subscribe(
        (_) => {
          this.toastService.success('Presença salva com sucesso');
        },
        (_) => {
          this.toastService.error('Erro ao salvar presença');
        }
      );
  }

  loadEntidade(): void {
    this.atividadesService
      .getAtividadesByEdicaoInscricao(this.edicaoService.semanaSelecionada!.id)
      .subscribe(
        (atividades) => {
          this.atividades = atividades;
        },
        (_) => {
          this.toastService.error('Erro ao carregar presença');
        },
        () => {
          this.carregandoPresenca = false;
        }
      );
  }

  obterModelo(entidadeEdicao?: BaseModel): ModalFieldConfiguration[] {
    throw new Error('Method not implemented.');
  }

  selectEdicao() {
    super.selectEdicao();
    this.loadEntidade();
  }

  definirPresenca(presenca: PresencaItem) {
    const inteira = presenca.inteira;
    const meia = presenca.meia;
    presenca.inteira = !inteira && !meia;
    presenca.meia = inteira && !meia;
    this.salvarPresencaRequest.next(presenca);
  }

  selectAtividade() {
    this.carregandoPresenca = true;
    this.headerDias = [];
    this.edicaoService.diasSemana.forEach((dia) => {
      if (
        this.atividadeSelecionada.horarios?.some((x) => x.dia === dia.weekDay)
      ) {
        this.headerDias.push({
          parsedDia: dia.parsedShortDate,
          dia: dia.weekDay,
        });
      }
    });
    this.presencaService
      .obterAlunosPresenca(this.atividadeSelecionada.id)
      .subscribe(
        (res) => {
          this.alunosPresenca = res;
          this.alunosPresenca.map((x) => {
            this.headerDias.forEach((dia) => {
              if (
                !x.presencas.some((z: { dia: number }) => z.dia === dia.dia)
              ) {
                x.presencas.push({
                  inscricao_atividade_id: x.id,
                  dia: dia.dia,
                  inteira: false,
                  meia: false,
                });
              }
            });
            x.presencas.sort(
              (a: { dia: number }, b: { dia: number }) => a.dia - b.dia
            );
            return x;
          });
        },
        (_) => {
          this.toastService.error('Ocorreu um erro ao carregar presenças');
        },
        () => {
          this.carregandoPresenca = false;
        }
      );
  }
}
