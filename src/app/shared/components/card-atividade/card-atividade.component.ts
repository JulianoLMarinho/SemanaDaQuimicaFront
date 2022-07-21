import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';
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

  textos = {
    CURSO: 'Cursos de diferentes temas e cargas horárias com certificação.',
    PALESTRA:
      'Palestras gratuitas sobre temas atuais em diferentes horários. Todas as palestras são gratuitas!',
    WORKSHOP: 'Workshops com temas abordados de forma direta e interativa.',
    VISITA_TECNICA:
      'Visitas que possibilitam acompanhar de perto o funcionamento de algumas empresas.',
  };

  imgs = {
    CURSO: '../../../../assets/imgs/cursos.png',
    PALESTRA: '../../../../assets/imgs/palestra.png',
    WORKSHOP: '../../../../assets/imgs/workshop.png',
    VISITA_TECNICA: '../../../../assets/imgs/visita_tecnica.png',
  };

  links = {
    CURSO: '../cursos',
    PALESTRA: '../palestras',
    WORKSHOP: '../workshops',
    VISITA_TECNICA: '../visitas-tecnicas',
  };

  constructor(public coresEdicao: CoresEdicaoService, private router: Router) {}

  ngAfterViewInit(): void {}

  ngOnInit() {}

  navigate() {
    this.router.navigate([this.links[this.tipoAtividade]]);
  }
}
