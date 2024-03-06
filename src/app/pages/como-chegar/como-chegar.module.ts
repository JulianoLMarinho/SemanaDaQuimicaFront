import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComoChegarComponent } from './como-chegar.component';
import { SharedModule } from '../../shared/shared.module';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

@NgModule({
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule],
  declarations: [ComoChegarComponent],
})
export class ComoChegarModule {}
