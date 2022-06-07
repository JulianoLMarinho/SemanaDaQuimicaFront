import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadesComponent } from './atividades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  declarations: [AtividadesComponent],
})
export class AtividadesModule {}
