import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { ResponsavelService } from '../../../services/responsavel.service';
import { ModalFieldConfiguration } from '../../../shared/components/modal-adicionar-editar/modal-field-configuration';
import { Responsavel } from '../../../shared/models/responsavel';
import { BaseConfiguracaoComponent } from '../base-configuracao/base-configuracao.component';

@Component({
  selector: 'app-responsavel-configuracao',
  templateUrl: './responsavel-configuracao.component.html',
  styleUrls: ['./responsavel-configuracao.component.scss'],
})
export class ResponsavelConfiguracaoComponent
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

  ngOnInit(): void {
    this.loadResponsaveis();
  }
  loadEntidade(): void {
    throw new Error('Method not implemented.');
  }

  loadResponsaveis() {
    this.loadingEntidade = true;
    this.responsavelService.getResponsaveisList().subscribe(
      (resps) => {
        this.responsaveis = resps;
        this.responsaveis.map((x) => {
          x.fotoEnc = x.foto
            ? this.sanitizer.bypassSecurityTrustResourceUrl(x.foto)
            : undefined;
        });
        this.loadingEntidade = false;
      },
      () => {
        this.loadingEntidade = false;
      }
    );
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
        fieldName: 'Descrição do Responsável',
        fieldInitialValue: editResponsavel?.descricao_responsavel,
        fieldProperty: 'descricao_responsavel',
        fieldType: 'textArea',
        fieldPlaceholder: 'Insira o nome a descrição',
        fieldErrorMessage: 'É necessário inserir uma descrição',
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
        fieldName: 'ID Lattes do Responsável',
        fieldInitialValue: editResponsavel?.id_lattes,
        fieldProperty: 'id_lattes',
        fieldType: 'text',
        fieldPlaceholder: 'Insira o ID Lattes',
        fieldErrorMessage: 'É necessário inserir o ID',
        fieldValidators: [Validators.required],
        fieldShowOnTable: false,
      },
      {
        fieldName: 'Página Web',
        fieldInitialValue: editResponsavel?.pagina_url,
        fieldProperty: 'pagina_url',
        fieldType: 'text',
        fieldPlaceholder: 'Insira a URL da página',
        fieldErrorMessage: '',
        fieldValidators: [],
        fieldShowOnTable: false,
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
    ];
  }

  salvarNovoResponsavel(responsavel: any): Observable<boolean> {
    return this.responsavelService.salvarNovoResponsavel(responsavel);
  }
}
