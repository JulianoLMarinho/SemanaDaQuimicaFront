import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
import { ResponsavelService } from 'src/app/services/responsavel.service';
import { ModalFieldConfiguration } from 'src/app/shared/components/modal-adicionar-editar/modal-field-configuration';
import { Responsavel } from 'src/app/shared/models/responsavel';
import { BaseConfiguracaoComponent } from '../base-configuracao/base-configuracao.component';

@Component({
  selector: 'app-comissao',
  templateUrl: './comissao.component.html',
  styleUrls: ['./comissao.component.scss'],
})
export class ComissaoComponent
  extends BaseConfiguracaoComponent
  implements OnInit
{
  responsaveis: Responsavel[] = [];

  constructor(
    edicaoService: EdicaoSemanaService,
    toastService: ToastrService,
    private sanitizer: DomSanitizer,
    private responsavelService: ResponsavelService
  ) {
    super(edicaoService, toastService);
  }

  loadEntidade(): void {
    this.loadResponsaveis();
  }

  loadResponsaveis() {
    this.loadingEntidade = true;
    this.responsavelService.getComissao(this.edicaoSelecionada!.id).subscribe({
      next: (comissao) => {
        this.responsaveis = comissao;
        this.responsaveis.map((x) => {
          x.fotoEnc = x.foto
            ? this.sanitizer.bypassSecurityTrustResourceUrl(x.foto)
            : undefined;
        });
      },
      complete: () => {
        this.loadingEntidade = false;
      },
    });
  }

  obterModelo(editResponsavel?: Responsavel): ModalFieldConfiguration[] {
    return [
      {
        fieldName: 'Imagem',
        fieldInitialValue: editResponsavel?.foto,
        fieldProperty: 'foto',
        fieldType: 'picture',
        fieldPlaceholder: 'Selecione uma foto',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      this.getIdField(editResponsavel),
      {
        fieldName: 'Nome',
        fieldInitialValue: editResponsavel?.nome_responsavel,
        fieldProperty: 'nome_responsavel',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o nome do responsável',
        fieldErrorMessage: 'É necessário inserir um nome',
        fieldValidators: [Validators.required],
        tableStyle: {
          width: '20%',
          flex: 'none',
        },
      },
      {
        fieldName: 'Função',
        fieldInitialValue: editResponsavel?.funcao_semana,
        fieldProperty: 'funcao_semana',
        fieldType: 'textArea',
        fieldPlaceholder: 'Insira a função na semana da químia',
        fieldErrorMessage: 'É necessário inserir uma função',
        fieldValidators: [Validators.required],
        tableStyle: {
          overflow: 'hidden',
          'white-space': 'nowrap',
          width: '70%',
          'text-overflow': 'ellipsis',
          flex: 'none',
        },
      },
      {
        fieldName: 'Twitter',
        fieldInitialValue: editResponsavel?.twitter,
        fieldProperty: 'twitter',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o twitter do responsável',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Instagram',
        fieldInitialValue: editResponsavel?.instagram,
        fieldProperty: 'instagram',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o Instagram do responsável',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Facebook',
        fieldInitialValue: editResponsavel?.facebook,
        fieldProperty: 'facebook',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o Facebook do responsável',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'ID Lattes do Responsável',
        fieldInitialValue: editResponsavel?.id_lattes,
        fieldProperty: 'id_lattes',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o ID Lattes',
        fieldErrorMessage: 'É necessário inserir o ID',
        fieldValidators: [],
        fieldShowOnTable: false,
      },
    ];
  }

  salvarResponsavel(responsavel: any): Observable<boolean> {
    responsavel.tipo = 'comissao';
    if (responsavel.id) {
      return this.responsavelService.atualizarComissao(responsavel);
    } else {
      responsavel.edicao_semana_id = this.edicaoSelecionada?.id;
      return this.responsavelService.salvarComissao(responsavel);
    }
  }

  deletarComissao(comissao: any): Observable<boolean> {
    return this.responsavelService.deletarResponsavel(comissao.id);
  }
}
