import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  API_URL = environment.apiURL;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private storage: StorageService) {}

  setToken(userToken: string) {
    this.headers = this.headers.set('Authorization', 'Bearer ' + userToken);
  }

  get<T>(url: string, cacheData: boolean = false, params?: any) {
    cacheData = false;
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
            return of<T>(res);
          }
        })
      );
    }
    return this.http.get<T>(this.API_URL + url, {
      headers: this.headers,
      params,
    });
  }

  post<T, U>(url: string, body: U) {
    return this.http.post<T>(this.API_URL + url, body, {
      headers: this.headers,
    });
  }

  put<T, U>(url: string, body?: U) {
    return this.http.put<T>(this.API_URL + url, body, {
      headers: this.headers,
    });
  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.API_URL + url, { headers: this.headers });
  }
}
