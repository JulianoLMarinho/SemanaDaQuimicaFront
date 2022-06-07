import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Usuario } from '../shared/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  API_URL = 'https://semana-da-quimica-back.azurewebsites.net/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  setToken(userToken: string) {
    this.headers = this.headers.set('Authorization', 'Bearer ' + userToken);
  }

  get<T>(url: string) {
    const cachedResponse = localStorage.getItem(this.API_URL + url);
    if (false) {
      // return of(<T>JSON.parse(cachedResponse));
    } else {
      return this.http.get<T>(this.API_URL + url, { headers: this.headers });
    }
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
