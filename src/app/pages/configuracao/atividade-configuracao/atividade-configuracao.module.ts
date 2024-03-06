import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadeConfiguracaoComponent } from './atividade-configuracao.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

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
