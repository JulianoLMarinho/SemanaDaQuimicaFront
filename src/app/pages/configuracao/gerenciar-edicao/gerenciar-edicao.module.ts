import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarEdicaoComponent } from './gerenciar-edicao.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [CommonModule, SharedModule, MatTabsModule],
  declarations: [GerenciarEdicaoComponent],
})
export class GerenciarEdicaoModule {}
