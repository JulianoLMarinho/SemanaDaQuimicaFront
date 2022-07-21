import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  saving = false;
  @Input() salvarAction: () => any = () => {
    console.log('Não implementado');
  };
  @Input() tamanhoFotoH: number = 500;
  @Input() tamanhoFotoV: number = 500;
  proporcao: number;
  @Input() cancelar: () => any = () => {
    console.log('Não implementado');
  };
  constructor() {
    this.proporcao = this.tamanhoFotoH / this.tamanhoFotoV;
  }

  ngOnInit() {}

  setTamanhos(width: number, height: number) {
    this.tamanhoFotoH = width;
    this.tamanhoFotoV = height;
    this.proporcao = this.tamanhoFotoH / this.tamanhoFotoV;
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
