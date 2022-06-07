import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { Usuario } from '../shared/models/usuario';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  API_URL = 'https://semana-da-quimica-back.azurewebsites.net/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private storage: StorageService) {}

  setToken(userToken: string) {
    this.headers = this.headers.set('Authorization', 'Bearer ' + userToken);
  }

  get<T>(url: string, cacheData: boolean = false) {
    if (cacheData) {
      let getHeaders = this.headers.set('cache_data', 'cache_data');
      this.storage;
      return from(this.storage.getValue(this.API_URL + url)).pipe(
        switchMap((res) => {
          if (!res) {
            return this.http.get<T>(this.API_URL + url, {
              headers: getHeaders,
            });
          } else {
            return of(res);
          }
        })
      );
    }
    return this.http.get<T>(this.API_URL + url, { headers: this.headers });
  }

  post<T, U>(url: string, body: U) {
    return this.http.post<T>(this.API_URL + url, body, {
      headers: this.headers,
    });
  }

  put<T, U>(url: string, body: U) {
    return this.http.put<T>(this.API_URL + url, body, {
      headers: this.headers,
    });
  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.API_URL + url, { headers: this.headers });
  }
}
