import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, scheduled } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class HttpCacheIntercept implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          if (event.body) {
            //localStorage.setItem(request.url, JSON.stringify(event.body));
          }
        }
        return event;
      })
    );
  }
}
