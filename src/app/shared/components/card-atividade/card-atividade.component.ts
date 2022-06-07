import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'card-atividade',
  templateUrl: './card-atividade.component.html',
  styleUrls: ['./card-atividade.component.scss'],
})
export class CardAtividadeComponent implements OnInit, AfterViewInit {
  @Input() tipoAtividade: 'CURSO' | 'PALESTRA' | 'WORKSHOP' | 'VISITA_TECNICA' =
    'CURSO';

  titulos = {
    CURSO: 'Cursos',
    PALESTRA: 'Palestras',
    WORKSHOP: 'Workshops',
    VISITA_TECNICA: 'Visitas Técnicas',
  };

  showEdit = false;

  constructor(
    private authService: AuthenticationService,
    private modalService: NgbModal
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit() {}

  mouseOver() {
    this.showEdit = this.authService.userIsAdmin();
  }
}
