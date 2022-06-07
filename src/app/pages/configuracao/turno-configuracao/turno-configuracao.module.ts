import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoConfiguracaoComponent } from './turno-configuracao.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
