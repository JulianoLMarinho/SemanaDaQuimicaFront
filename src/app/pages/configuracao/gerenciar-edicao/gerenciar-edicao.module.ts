import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarEdicaoComponent } from './gerenciar-edicao.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';

@NgModule({
  imports: [CommonModule, SharedModule, MatTabsModule],
  declarations: [GerenciarEdicaoComponent],
})
export class GerenciarEdicaoModule {}
