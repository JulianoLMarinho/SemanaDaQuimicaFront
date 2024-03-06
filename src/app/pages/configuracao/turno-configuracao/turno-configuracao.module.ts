import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoConfiguracaoComponent } from './turno-configuracao.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSortModule,
  ],
  declarations: [TurnoConfiguracaoComponent],
})
export class TurnoConfiguracaoModule {}
