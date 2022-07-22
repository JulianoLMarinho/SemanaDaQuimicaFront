import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComoChegarComponent } from './como-chegar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule],
  declarations: [ComoChegarComponent],
})
export class ComoChegarModule {}
