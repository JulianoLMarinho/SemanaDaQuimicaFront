import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { EdicaoSemanaService } from '../services/edicaoSemana.service';

@Injectable({ providedIn: 'root' })
export class CadastroIncompletoGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toast: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      this.authenticationService.authResponse
        .asObservable()
        .subscribe((res) => {
          const faltamDados = this.authenticationService.faltamDados;
          if (faltamDados) {
            this.toast.info(
              'Você precisa finalizar o seu cadastro.',
              undefined,
              { timeOut: 10000 }
            );
            this.router.navigate(['/meus_dados']);
            reject(false);
          } else {
            resolve(true);
          }
        });
      if (!this.authenticationService.loading) {
        const faltamDados = this.authenticationService.faltamDados;
        if (faltamDados) {
          this.toast.info('Você precisa finalizar o seu cadastro.');
          this.router.navigate(['/meus_dados']);
          reject(false);
        } else {
          resolve(true);
        }
      }
    });
  }
}
