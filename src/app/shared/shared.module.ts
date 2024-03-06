import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPatrocinadorComponent } from './components/card-patrocinador/card-patrocinador.component';
import { CardAtividadeComponent } from './components/card-atividade/card-atividade.component';
import { AutoCompleteInputComponent } from './components/auto-complete-input/auto-complete-input.component';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { PageTopBarComponent } from './components/page-top-bar/page-top-bar.component';
import { EditButtonComponent } from './components/edit-button/edit-button.component';
import { EditAttributeComponent } from './components/edit-attribute/edit-attribute.component';
import { DiasSemanaSelectComponent } from './components/dias-semana-select/dias-semana-select.component';
import { DescricaoAtividadeComponent } from './components/descricao-atividade/descricao-atividade.component';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { TabelaEdicaoComponent } from './components/tabela-edicao/tabela-edicao.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { ModalAdicionarEditarComponent } from './components/modal-adicionar-editar/modal-adicionar-editar.component';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ResponsavelCardComponent } from './components/responsavel-card/responsavel-card.component';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';
import { MatSortModule } from '@angular/material/sort';
import { CertificadoExportComponent } from './components/certificado-export/certificado-export.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { EmConstrucaoComponent } from './components/em-construcao/em-construcao.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { QuillModule } from 'ngx-quill';
import { AvisoModalComponent } from './components/aviso/aviso.component';

registerLocaleData(localePT);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    NgbModalModule,
    MatTableModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatPaginatorModule,
    ImageCropperModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    QuillModule.forRoot(),
  ],
  declarations: [
    CardPatrocinadorComponent,
    CardAtividadeComponent,
    AutoCompleteInputComponent,
    PageTopBarComponent,
    EditButtonComponent,
    EditAttributeComponent,
    DiasSemanaSelectComponent,
    DescricaoAtividadeComponent,
    CalendarViewComponent,
    TabelaEdicaoComponent,
    ModalAdicionarEditarComponent,
    ResponsavelCardComponent,
    ModalConfirmacaoComponent,
    CertificadoExportComponent,
    ImageUploadComponent,
    EmConstrucaoComponent,
    AvisoModalComponent,
  ],
  exports: [
    CardPatrocinadorComponent,
    CardAtividadeComponent,
    AutoCompleteInputComponent,
    PageTopBarComponent,
    EditButtonComponent,
    EditAttributeComponent,
    DiasSemanaSelectComponent,
    DescricaoAtividadeComponent,
    CalendarViewComponent,
    TabelaEdicaoComponent,
    ModalAdicionarEditarComponent,
    ResponsavelCardComponent,
    ModalConfirmacaoComponent,
    CertificadoExportComponent,
    ImageUploadComponent,
    EmConstrucaoComponent,
    AvisoModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
