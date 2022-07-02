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
    const usuarioLogadoAdmin = this.authenticationService.userIsAdmin();
    console.log(usuarioLogadoAdmin);
    if (
      this.edicaoSemanaService.semanaAtiva.site_em_construcao &&
      !usuarioLogadoAdmin
    ) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
