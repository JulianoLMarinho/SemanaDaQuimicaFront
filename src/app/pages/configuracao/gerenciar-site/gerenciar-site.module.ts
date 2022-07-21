import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarSiteComponent } from './gerenciar-site.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
