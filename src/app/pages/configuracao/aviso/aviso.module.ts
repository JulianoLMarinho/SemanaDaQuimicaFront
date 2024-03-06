import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisoComponent } from './aviso.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

@NgModule({
  imports: [CommonModule, SharedModule, MatFormFieldModule, MatSelectModule],
  declarations: [AvisoComponent],
})
export class AvisoModule {}
