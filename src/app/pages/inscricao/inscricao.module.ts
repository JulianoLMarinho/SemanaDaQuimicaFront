import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscricaoComponent } from './inscricao.component';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule],
  declarations: [InscricaoComponent],
})
export class InscricaoModule {}
