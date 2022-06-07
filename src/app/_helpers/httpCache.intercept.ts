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
import { StorageService } from '../services/storage.service';

@Injectable()
export class HttpCacheIntercept implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          if (event.body) {
            if (request.headers.has('cache_data')) {
              this.storage.setValue(request.url, event.body);
            }
          }
        }
        return event;
      })
    );
  }
}
