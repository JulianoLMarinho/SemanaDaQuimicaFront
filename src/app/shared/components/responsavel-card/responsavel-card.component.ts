import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Responsavel } from '../../models/responsavel';
import { AppUtils } from '../../utils';

@Component({
  selector: 'app-responsavel-card',
  templateUrl: './responsavel-card.component.html',
  styleUrls: ['./responsavel-card.component.scss'],
})
export class ResponsavelCardComponent implements OnInit {
  @Input() responsavel!: Responsavel;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  imageSanitizer(foto: string) {
    return AppUtils.imageSanitizer(foto, this.sanitizer);
  }
}
