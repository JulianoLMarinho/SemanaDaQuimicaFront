import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PalestrasComponent } from './palestras.component';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule],
  declarations: [PalestrasComponent],
})
export class PalestrasModule {}
