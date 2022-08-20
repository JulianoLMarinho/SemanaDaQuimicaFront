import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Aviso } from '../../../shared/models/aviso';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { ModalFieldConfiguration } from '../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { BaseModel } from '../../../shared/models/baseModel';
import { BaseConfiguracaoComponent } from '../base-configuracao/base-configuracao.component';
import { Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss'],
})
export class AvisoComponent extends BaseConfiguracaoComponent {
  avisos: Aviso[] = [];

  constructor(edicaoService: EdicaoSemanaService, toastService: ToastrService) {
    super(edicaoService, toastService);
  }

  loadEntidade(): void {
    this.edicaoService
      .obterAvisos(this.edicaoSelecionada!.id)
      .subscribe((res) => {
        this.avisos = res;
      });
  }

  obterModelo(entidadeEdicao?: Aviso): ModalFieldConfiguration[] {
    return [
      this.getIdField(entidadeEdicao),
      {
        fieldName: 'Título',
        fieldInitialValue: entidadeEdicao?.titulo,
        fieldProperty: 'titulo',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o título do aviso',
        fieldErrorMessage: 'É necessário inserir um título',
        fieldValidators: [Validators.required],
      },
      {
        fieldName: 'Texto',
        fieldInitialValue: entidadeEdicao?.texto,
        fieldProperty: 'texto',
        fieldType: 'textHTML',
        fieldPlaceholder: 'Insira o texto do aviso',
        fieldErrorMessage: 'É necessário inserir o texto',
        fieldValidators: [Validators.required],
        fieldShowOnTable: false,
      },
    ];
  }

  salvarAviso(aviso: any) {
    aviso.edicao_semana_id = this.edicaoSelecionada!.id;
    if (aviso.id) {
      return this.edicaoService.updateAviso(aviso);
    }
    return this.edicaoService.salvarAviso(aviso);
  }

  deletarAviso(aviso: any) {
    return this.edicaoService.deletarAviso(aviso.id);
  }
}
