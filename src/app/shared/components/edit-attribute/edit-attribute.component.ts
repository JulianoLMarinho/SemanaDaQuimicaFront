import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-attribute',
  templateUrl: './edit-attribute.component.html',
  styleUrls: ['./edit-attribute.component.scss'],
})
export class EditAttributeComponent implements OnInit {
  @Input() atributo = '';

  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {}

  save() {
    this.modal.close(this.atributo);
  }
}
