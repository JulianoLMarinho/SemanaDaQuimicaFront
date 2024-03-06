import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadesComponent } from './atividades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  declarations: [AtividadesComponent],
})
export class AtividadesModule {}
