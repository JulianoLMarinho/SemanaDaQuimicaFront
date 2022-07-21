import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { EdicaoSemanaService } from '../services/edicaoSemana.service';

@Injectable({ providedIn: 'root' })
export class EmConstrucaoGuard implements CanActivate {
  constructor(
    private router: Router,
    private edicaoSemanaService: EdicaoSemanaService,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      this.edicaoSemanaService.loadingSemanaAtivaSubject
        .asObservable()
        .subscribe((edicao) => {
          const usuarioLogadoAdmin = this.authenticationService.userIsAdmin();
          if (edicao.site_em_construcao && !usuarioLogadoAdmin) {
            this.router.navigate(['/']);
            reject(false);
          } else {
            resolve(true);
          }
        });
      if (this.edicaoSemanaService.semanaAtiva) {
        const usuarioLogadoAdmin = this.authenticationService.userIsAdmin();
        if (
          this.edicaoSemanaService.semanaAtiva.site_em_construcao &&
          !usuarioLogadoAdmin
        ) {
          this.router.navigate(['/']);
          reject(false);
        } else {
          resolve(true);
        }
      }
    });
  }
}
