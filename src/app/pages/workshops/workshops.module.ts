import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsComponent } from './workshops.component';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule],
  declarations: [WorkshopsComponent],
})
export class WorkshopsModule {}
