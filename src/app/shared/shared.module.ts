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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalAdicionarEditarComponent } from './components/modal-adicionar-editar/modal-adicionar-editar.component';
import { MatSelectModule } from '@angular/material/select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ResponsavelCardComponent } from './components/responsavel-card/responsavel-card.component';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';
import { MatSortModule } from '@angular/material/sort';
import { CertificadoExportComponent } from './components/certificado-export/certificado-export.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { EmConstrucaoComponent } from './components/em-construcao/em-construcao.component';

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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
