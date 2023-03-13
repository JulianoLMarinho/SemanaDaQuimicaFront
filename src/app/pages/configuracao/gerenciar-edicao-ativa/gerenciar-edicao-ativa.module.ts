import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarEdicaoAtivaComponent } from './gerenciar-edicao-ativa.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GerenciarSiteModule } from '../gerenciar-site/gerenciar-site.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    GerenciarSiteModule,
    MatFormFieldModule,
    MatInputModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'bullet' }],
          [{ color: [] }],
          ['link'],
        ],
      },
    }),
  ],
  declarations: [GerenciarEdicaoAtivaComponent],
})
export class GerenciarEdicaoAtivaModule {}
