import { Component, OnInit } from '@angular/core';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.scss'],
})
export class FaleConoscoComponent implements OnInit {
  constructor(public coresEdicao: CoresEdicaoService) {}

  ngOnInit() {}
}
