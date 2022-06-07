import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { PatrocinadorService } from '../../../services/patrocinador.service';
import { EditButtonDirective } from '../../models/edit-button-directive';
import { Patrocinador } from '../../models/Patrocinador';
import { ModalAdicionarEditarComponent } from '../modal-adicionar-editar/modal-adicionar-editar.component';
import { ModalFieldConfiguration } from '../modal-adicionar-editar/modal-field-configuration';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'sq-card-patrocinador',
  templateUrl: './card-patrocinador.component.html',
  styleUrls: ['./card-patrocinador.component.scss'],
})
export class CardPatrocinadorComponent implements OnInit {
  @Input()
  patrocinador!: Patrocinador;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  addEditPatr: any = {
    imagem: '',
  };

  activeModal!: NgbModalRef;

  @Output() reloadPatrocinadores = new EventEmitter();

  constructor(
    public authService: AuthenticationService,
    private modalService: NgbModal,
    private patrocinadorService: PatrocinadorService,
    private edicaoSemanaService: EdicaoSemanaService,
    private toastr: ToastrService,
    public coresEdicao: CoresEdicaoService
  ) {}

  ngOnInit() {}

  getModalFields(): ModalFieldConfiguration[] {
    return [
      {
        fieldName: 'Imagem',
        fieldType: 'image',
        fieldErrorMessage: '',
        fieldInitialValue: '',
        fieldProperty: 'image',
        fieldValidators: [],
      },
    ];
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.addEditPatr.imagem = event.base64;
  }

  openModal(content: any) {
    this.croppedImage = this.patrocinador.imagem;
    this.addEditPatr.id = this.patrocinador.id;
    this.addEditPatr.imagem = this.patrocinador.imagem;
    this.addEditPatr.nome = this.patrocinador.nome;
    this.addEditPatr.link = this.patrocinador.link;
    this.addEditPatr.ordem = this.patrocinador.ordem;
    this.activeModal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });

    this.activeModal.result.then(
      (result) => {
        // groupControl.value = result;
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  salvarPatrociador() {
    this.addEditPatr.edicao_semana_id = this.edicaoSemanaService.semanaAtiva.id;

    if (this.addEditPatr.id) {
      this.patrocinadorService
        .atualizarPatrocinador(this.addEditPatr)
        .subscribe(
          (_) => {
            this.toastr.success('Patrocinador Salvo com Sucesso');
            this.activeModal.close();
            this.reloadPatrocinadores.emit();
          },
          (_) => {
            this.toastr.error('Houve algum erro!');
          }
        );
    } else {
      this.patrocinadorService.salvarPatrocinador(this.addEditPatr).subscribe(
        (_) => {
          this.toastr.success('Patrocinador Salvo com Sucesso');
          this.activeModal.close();

          this.reloadPatrocinadores.emit();
        },
        (_) => {
          this.toastr.error('Houve algum erro!');
        }
      );
    }
  }

  deletarPatrocinador() {
    const carouselImageModal = this.modalService.open(
      ModalConfirmacaoComponent,
      { ariaLabelledBy: 'modal-basic-title' }
    );

    carouselImageModal.componentInstance.titulo = 'Confirmar deleção';
    carouselImageModal.componentInstance.mensagem =
      'Deseja deletar este patrocinador?';

    carouselImageModal.componentInstance.salvar = () => {
      this.patrocinadorService
        .deletarPatrocinador(this.patrocinador.id)
        .subscribe(
          (_) => {
            this.toastr.success('Patrocinador Deletado com Sucesso');
            carouselImageModal.close();
            this.reloadPatrocinadores.emit();
          },
          (_) => {
            this.toastr.error('Houve algum erro!');
          }
        );
    };
  }
}
