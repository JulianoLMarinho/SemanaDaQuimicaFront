import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpService) {}

  getImages(): Observable<any[]> {
    return this.http.get<any[]>('carrousel');
  }
}
