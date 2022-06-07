import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './shared/components/login/login.component';
import { Router } from '@angular/router';
import { EdicaoSemanaService } from './services/edicaoSemana.service';
import { CoresEdicaoService } from './services/coresEdicao.service';
import * as $ from 'jquery';
import { InscricaoService } from './services/inscricao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SemanaDaQuimica';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  images: any[] = [];
  inscricoesAtivas = 0;

  isMenuCollapsed = true;

  constructor(
    private observer: BreakpointObserver,
    public coresEdicao: CoresEdicaoService,
    public authService: AuthenticationService,
    public edicaoSemanaService: EdicaoSemanaService,
    private modalService: NgbModal,
    public router: Router,
    private inscricaoService: InscricaoService
  ) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'side';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.close();
        }
      });
  }

  ngOnInit() {
    this.authService.userChange.asObservable().subscribe((user) => {
      if (!user) {
        this.sidenav.mode = 'side';
        this.sidenav.close();
      }
    });

    this.coresEdicao.coresCarregadas.asObservable().subscribe((_) => {
      this.appendCustomCss();
    });

    if (this.authService.userIsAdmin()) {
      this.inscricaoService
        .totalInscricoesPagamentoInformado()
        .subscribe((total) => {
          this.inscricoesAtivas = total;
        });
    }
  }

  login() {
    this.modalService.open(LoginComponent, {
      centered: true,
      ariaDescribedBy: 'modal-basic-title',
      modalDialogClass: 'modal-login',
    });
  }

  limparLocalStorage() {
    localStorage.clear();
  }

  appendCustomCss() {
    let text = `
        .progress-spinner circle { 
          stroke: ${this.coresEdicao.coresAtivas.cor6} !important
        }
      `;

    let scrollBar = `
        ::-webkit-scrollbar-thumb {
          background: ${this.coresEdicao.coresAtivas.cor2};
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: ${this.coresEdicao.coresAtivas.cor1};
        }
        
        .alternative-scrollbar ::-webkit-scrollbar-thumb {
          background: ${this.coresEdicao.coresAtivas.cor5};
        }

        .alternative-scrollbar ::-webkit-scrollbar-thumb:hover {
          background: ${this.coresEdicao.coresAtivas.cor1};
        }
    `;
    $(() => {
      $('style').append(text);
      $('style').append(scrollBar);
    });
  }
}
