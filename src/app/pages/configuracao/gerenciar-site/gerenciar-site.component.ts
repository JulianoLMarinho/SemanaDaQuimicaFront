import { Component, OnInit } from '@angular/core';
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

  editar = false;
  loadEntidade(): void {
    throw new Error('Method not implemented.');
  }
  obterModelo(entidadeEdicao?: BaseModel): ModalFieldConfiguration[] {
    throw new Error('Method not implemented.');
  }

  constructor(
    public edicaoService: EdicaoSemanaService,
    public toastService: ToastrService,
    private coresEdicaoService: CoresEdicaoService
  ) {
    super(edicaoService, toastService);
    const edicao_semana_id = edicaoService.semanaSelecionada
      ? edicaoService.semanaSelecionada.id
      : edicaoService.semanaAtiva.id;

    this.carregarPaleta(edicao_semana_id);
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
    this.coresEdicaoService
      .salvarCores(this.cores)
      .pipe(
        finalize(() => {
          this.salvando = false;
        })
      )
      .subscribe(
        (_) => {
          this.toastService.success('Paleta de cores atualizada com sucesso!');

          if (
            this.edicaoService.semanaAtiva.id === this.edicaoSelecionada?.id
          ) {
            window.location.reload();
          }
          this.editar = false;
        },
        (_) => {
          this.toastService.error('Houve algum erro. Tente novamente!');
        }
      );
  }

  editarCores() {
    this.editar = true;
  }

  cancelarEdicao() {
    this.editar = false;
  }

  selectEdicao() {
    super.selectEdicao();
    this.carregarPaleta(this.edicaoSelecionada!.id);
  }
}
