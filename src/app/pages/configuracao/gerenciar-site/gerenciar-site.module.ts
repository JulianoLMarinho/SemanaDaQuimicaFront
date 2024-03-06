import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarSiteComponent } from './gerenciar-site.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [GerenciarSiteComponent],
  exports: [GerenciarSiteComponent],
})
export class GerenciarSiteModule {}
