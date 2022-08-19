import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DiasSemanaSelectComponent } from '../dias-semana-select/dias-semana-select.component';
import { ModalFieldConfiguration } from './modal-field-configuration';

@Component({
  selector: 'app-modal-adicionar-editar',
  templateUrl: './modal-adicionar-editar.component.html',
  styleUrls: ['./modal-adicionar-editar.component.scss'],
})
export class ModalAdicionarEditarComponent implements OnInit {
  saving = false;
  salvarAction: Function = () => {};
  @Input() modalFields: ModalFieldConfiguration[] = [];
  @Input() saveDataAction!: (entidade: any) => Observable<boolean>;
  @Input() readOnly = false;

  @Output() saved = new EventEmitter();
  groupControl: UntypedFormGroup = new UntypedFormGroup({});

  @ViewChild(DiasSemanaSelectComponent)
  dayField!: DiasSemanaSelectComponent;

  modules = {
    toolbar: [
      [{ align: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'bullet' }],
      [{ color: [] }],
      ['image'],
    ],
  };

  htmlText = '';
  constructor(
    private toastService: ToastrService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    for (let field of this.modalFields) {
      this.groupControl.addControl(
        field.fieldProperty,
        new UntypedFormControl(field.fieldInitialValue, field.fieldValidators)
      );

      if (field.fieldLoadOptionsService) {
        field.fieldLoadOptionsService().subscribe((options) => {
          field.fieldOptions = options;
          field.fieldOptionsFiltered = options;
        });
      }
    }
    if (this.readOnly) {
      this.groupControl.disable();
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  callFunction(func: Function | undefined, args: any) {
    if (func) func.call(args);
  }

  filterOptions(filterText: any, target: ModalFieldConfiguration) {
    target.fieldOptionsFiltered = target.fieldOptions
      ? target.fieldOptions.filter((x) =>
          x.name.toLowerCase().includes(filterText.value.toLowerCase())
        )
      : [];
  }

  salvar() {
    const dayControlField = this.modalFields.find(
      (x) => x.fieldType === 'dayHour'
    );
    if (this.dayField && dayControlField) {
      this.dayField.markAsTouched();
      const l = this.dayField.validate(
        this.groupControl.controls[dayControlField.fieldProperty]
      );
      this.groupControl.controls[dayControlField.fieldProperty].setValue(
        this.groupControl.controls[dayControlField.fieldProperty].value
      );
    }
    this.groupControl.markAllAsTouched();
    if (this.groupControl.invalid) return;
    const formValues = this.groupControl.getRawValue();
    this.saving = true;
    this.salvarAction(formValues).subscribe(
      () => {
        this.toastService.success('Operação realizada com sucesso!');
        this.saving = false;
        this.saved.emit();
        this.closeModal();
      },
      () => {
        this.toastService.error('Ocorreu um erro durante o salvamento.');
        this.saving = false;
      }
    );
  }

  salvarFoto(content: any) {
    content.close(this.croppedImage);
  }

  showHideField(field: ModalFieldConfiguration) {
    const result = field.fieldVisible
      ? field.fieldVisible(this.groupControl.getRawValue())
      : true;
    if (result) {
      this.groupControl.controls[field.fieldProperty].enable();
    } else {
      this.groupControl.controls[field.fieldProperty].disable();
    }
    return result;
  }

  openModal(content: any, groupControl: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          groupControl.value = result;
        },
        (reason) => {
          console.log(reason);
        }
      );
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  imageSanitizer(image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
}
