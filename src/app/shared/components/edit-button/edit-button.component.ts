import { Component, Input, OnInit } from '@angular/core';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
})
export class EditButtonComponent implements OnInit {
  @Input() editClick!: Function;
  @Input() showButton = false;

  constructor(public coresEdicao: CoresEdicaoService) {}

  ngOnInit() {}
}
