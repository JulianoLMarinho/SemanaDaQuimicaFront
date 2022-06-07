import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { StyleService } from '../../services/style.service';
import { AdicionarEditarAtividadeComponent } from '../adicionar-editar-atividade/adicionar-editar-atividade.component';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss'],
})
export class AtividadesComponent implements OnInit {
  constructor(
    private router: Router,
    public socialAuthService: SocialAuthService,
    public styleService: StyleService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      // console.log(user);
    });
  }

  loginWithGoogle() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {});
  }

  changeColor(event: any) {
    this.styleService.primary = event.target.value;
  }
}
