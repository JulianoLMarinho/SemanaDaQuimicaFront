import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerarCertificadoComponent } from './gerar-certificado.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
