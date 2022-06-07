import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditContentDirective } from '../../shared/directives/edit-content.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
