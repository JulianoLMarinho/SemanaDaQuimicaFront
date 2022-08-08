import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelasComponent } from './tabelas.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatButtonModule,
  ],
  declarations: [TabelasComponent],
})
export class TabelasModule {}
