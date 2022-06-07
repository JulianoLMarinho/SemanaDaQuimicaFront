import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadeConfiguracaoComponent } from './atividade-configuracao.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [AtividadeConfiguracaoComponent],
})
export class AtividadeConfiguracaoModule {}
