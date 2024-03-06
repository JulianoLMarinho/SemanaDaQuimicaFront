import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PalestrasComponent } from './palestras.component';
import { SharedModule } from '../../shared/shared.module';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

@NgModule({
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule],
  declarations: [PalestrasComponent],
})
export class PalestrasModule {}
