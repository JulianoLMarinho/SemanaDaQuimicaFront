import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './shared/components/login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EdicaoSemanaService } from './services/edicaoSemana.service';
import { CoresEdicaoService } from './services/coresEdicao.service';
import * as $ from 'jquery';
import { InscricaoService } from './services/inscricao.service';
import { ToastrService } from 'ngx-toastr';
import { Aviso } from './shared/models/aviso';
import { AvisoComponent } from './pages/configuracao/aviso/aviso.component';
import { AvisoModalComponent } from './shared/components/aviso/aviso.component';
import { StorageService } from './services/storage.service';

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
  newNotifications = 0;
  isMenuCollapsed = true;
  avisos: Aviso[] = [];
  notificacoesAbertas: number[] = [];

  constructor(
    private observer: BreakpointObserver,
    public coresEdicao: CoresEdicaoService,
    public authService: AuthenticationService,
    public edicaoSemanaService: EdicaoSemanaService,
    private modalService: NgbModal,
    public router: Router,
    private route: ActivatedRoute,
    private inscricaoService: InscricaoService,
    private toast: ToastrService,
    private storage: StorageService
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
      if (this.authService.userIsAdmin()) {
        this.inscricaoService
          .totalInscricoesPagamentoInformado()
          .subscribe((total) => {
            this.inscricoesAtivas = total;
          });
        setInterval(() => {
          this.inscricaoService
            .totalInscricoesPagamentoInformado()
            .subscribe((total) => {
              this.inscricoesAtivas = total;
            });
        }, 60000);
      }
    });

    this.coresEdicao.coresCarregadas.asObservable().subscribe((_) => {
      this.appendCustomCss();
    });

    this.route.queryParamMap.subscribe((res) => {
      const mode = res.get('mode');
      const code = res.get('oobCode');
      if (code && mode === 'verifyEmail') {
        this.authService.verificarEmail(code).then(
          (res) => {
            this.toast.success(
              'Seu email foi validado com sucesso.',
              undefined,
              {
                timeOut: 10000,
              }
            );
          },
          (err) => {
            switch (err.code) {
              case 'auth/expired-action-code':
                this.toast.error(
                  'O código de verificação expirou. Tente reenviar o código.'
                );
                break;
              case 'invalid-action-code':
                this.toast.error(
                  'O código de verificação não é válido. Tente reenviar o código.'
                );
                break;
              case 'auth/user-disabled':
                this.toast.error(
                  'O usuário está desabilitado e não pode acessar o sistema. Entre em contato com a Comissão Organizadora da Semana da Química.'
                );
                break;
              case 'auth/user-not-found':
                this.toast.error('O usuário não existe.');
                break;

                defaul: this.toast.error('O usuário não existe.');
            }
          }
        );
      }
    });

    this.edicaoSemanaService.loadingSemanaAtivaSubject
      .asObservable()
      .subscribe(async (_) => {
        await this.obterAvisos();
        setInterval(async () => {
          await this.obterAvisos();
        }, 90000);
      });
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

  async obterAvisos() {
    this.notificacoesAbertas = <number[]>(
      await this.storage.getValue<number[]>('notificacoesAbertas')
    );
    this.notificacoesAbertas = this.notificacoesAbertas
      ? this.notificacoesAbertas
      : [];
    this.avisos = <Aviso[]>await this.storage.getValue<Aviso[]>('avisos');
    this.avisos = this.avisos ? this.avisos : [];
    let ultimoAviso = null;
    if (this.avisos.length > 0) {
      ultimoAviso = this.avisos[0].data_criacao;
    }
    if (!ultimoAviso) {
      ultimoAviso = '2000-01-01T00:00:00';
    }
    this.edicaoSemanaService
      .obterAvisosPorData(this.edicaoSemanaService.semanaAtiva.id, ultimoAviso)
      .subscribe(async (res) => {
        this.avisos.unshift(...res);
        await this.storage.setValue('avisos', this.avisos);
        this.avisos.map((x) => {
          x.notificacao_aberta = this.notificacoesAbertas.includes(x.id);
        });
        this.newNotifications = this.avisos.filter(
          (x) => !x.notificacao_aberta
        ).length;
      });
  }

  async abrirAviso(aviso: Aviso) {
    this.notificacoesAbertas.push(aviso.id);
    aviso.notificacao_aberta = true;
    await this.storage.setValue(
      'notificacoesAbertas',
      this.notificacoesAbertas
    );
    const modal = this.modalService.open(AvisoModalComponent, {
      centered: true,
      ariaDescribedBy: 'modal-basic-title',
    });

    modal.componentInstance.aviso = aviso;
    this.newNotifications = this.avisos.filter(
      (x) => !x.notificacao_aberta
    ).length;
  }
}
