import { Component, Input, OnInit } from '@angular/core';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { StyleService } from '../../../services/style.service';

@Component({
  selector: 'app-page-top-bar',
  templateUrl: './page-top-bar.component.html',
  styleUrls: ['./page-top-bar.component.scss'],
})
export class PageTopBarComponent implements OnInit {
  @Input() loading = false;
  @Input() editando = false;
  @Input() loadingSave = false;
  @Input() titulo = '';

  @Input()
  salvarAction!: Function;

  @Input()
  editarAction!: Function;

  @Input()
  cancelarAction!: Function;

  constructor(public coresEdicao: CoresEdicaoService) {}

  ngOnInit() {}
}
