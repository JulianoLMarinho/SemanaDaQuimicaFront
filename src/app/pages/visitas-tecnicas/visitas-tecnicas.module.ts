import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitasTecnicasComponent } from './visitas-tecnicas.component';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule],
  declarations: [VisitasTecnicasComponent],
})
export class VisitasTecnicasModule {}
