import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerarCertificadoComponent } from './gerar-certificado.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [GerarCertificadoComponent],
})
export class GerarCertificadoModule {}
