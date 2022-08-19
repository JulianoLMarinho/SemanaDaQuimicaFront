import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisoComponent } from './aviso.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [CommonModule, SharedModule, MatFormFieldModule, MatSelectModule],
  declarations: [AvisoComponent],
})
export class AvisoModule {}
