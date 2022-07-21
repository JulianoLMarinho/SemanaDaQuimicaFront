import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { ModalFieldConfiguration } from '../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { BaseModel } from '../../../shared/models/baseModel';
import { CoresEdicao } from '../../../shared/models/coresEdicao';
import { BaseConfiguracaoComponent } from '../base-configuracao/base-configuracao.component';

@Component({
  selector: 'app-gerenciar-site',
  templateUrl: './gerenciar-site.component.html',
  styleUrls: ['./gerenciar-site.component.scss'],
})
export class GerenciarSiteComponent extends BaseConfiguracaoComponent {
  cores: CoresEdicao = {
    edicao_semana_id: 0,
    cor1: '#ffffff',
    cor2: '#ffffff',
    cor3: '#ffffff',
    cor4: '#ffffff',
    cor5: '#ffffff',
    cor6: '#ffffff',
  };
  salvando = false;
  loadingCores = false;
  edicao_semana_id: number;

  @Input() editar = false;
  @Output() editarChange = new EventEmitter<boolean>();
  @Output() salvandoChange = new EventEmitter<boolean>();

  loadEntidade(): void {
    //throw new Error('Method not implemented.');
  }
  obterModelo(entidadeEdicao?: BaseModel): ModalFieldConfiguration[] {
    //throw new Error('Method not implemented.');
    return [];
  }

  constructor(
    public edicaoService: EdicaoSemanaService,
    public toastService: ToastrService,
    private coresEdicaoService: CoresEdicaoService
  ) {
    super(edicaoService, toastService);
    this.edicao_semana_id = edicaoService.semanaSelecionada
      ? edicaoService.semanaSelecionada.id
      : edicaoService.semanaAtiva.id;

    this.carregarPaleta(this.edicao_semana_id);
  }

  carregarPaleta(edicaoId: number) {
    this.loadingCores = true;
    this.coresEdicaoService.obterCoresEdicao(edicaoId).subscribe((cores) => {
      if (cores) {
        this.cores = cores;
      } else {
        this.cores.edicao_semana_id = edicaoId;
      }
      this.loadingCores = false;
    });
  }

  salvarPaleta() {
    this.salvando = true;
    this.salvandoChange.emit(this.salvando);
    this.coresEdicaoService.salvarCores(this.cores).subscribe({
      next: (_) => {
        this.toastService.success('Paleta de cores atualizada com sucesso!');

        if (this.edicaoService.semanaAtiva.id === this.edicaoSelecionada?.id) {
          window.location.reload();
        }
        this.editar = false;
        this.editarChange.emit(this.editar);
      },
      error: (_) => {
        this.toastService.error('Houve algum erro. Tente novamente!');
      },
      complete: () => {
        this.salvando = false;
        this.salvandoChange.emit(this.salvando);
      },
    });
  }

  editarCores() {
    this.editar = true;
    this.editarChange.emit(this.editar);
  }

  cancelarEdicao() {
    this.carregarPaleta(this.edicao_semana_id);
    this.editar = false;
    this.editarChange.emit(this.editar);
  }

  selectEdicao() {
    super.selectEdicao();
    this.carregarPaleta(this.edicaoSelecionada!.id);
  }
}
