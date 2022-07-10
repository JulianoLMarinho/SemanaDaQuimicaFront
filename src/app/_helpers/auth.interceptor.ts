import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { firstValueFrom, from, lastValueFrom, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(request, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const token = await this.authenticationService.getAccessTokenAsync();
    const authReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
    return lastValueFrom(next.handle(authReq));
  }
}
