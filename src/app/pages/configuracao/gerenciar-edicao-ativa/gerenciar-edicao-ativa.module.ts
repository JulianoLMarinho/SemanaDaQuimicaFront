import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarEdicaoAtivaComponent } from './gerenciar-edicao-ativa.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { GerenciarSiteModule } from '../gerenciar-site/gerenciar-site.module';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
