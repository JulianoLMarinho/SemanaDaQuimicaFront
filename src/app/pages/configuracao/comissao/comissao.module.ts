import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComissaoComponent } from './comissao.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';

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
  declarations: [ComissaoComponent],
})
export class ComissaoModule {}
