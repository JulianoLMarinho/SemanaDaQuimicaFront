import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { EditContentDirective } from '../../shared/directives/edit-content.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    IvyCarouselModule,
    MatIconModule,
    MatButtonModule,
    ImageCropperModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  declarations: [InicioComponent, EditContentDirective],
})
export class InicioModule {}
