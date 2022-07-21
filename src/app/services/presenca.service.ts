import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Presenca, PresencaItem } from '../shared/models/presenca';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class PresencaService {
  constructor(private http: HttpService) {}

  obterAlunosPresenca(atividadeId: number): Observable<Presenca[]> {
    return this.http.get<Presenca[]>('presenca/' + atividadeId);
  }

  salvarPresenca(presenca: PresencaItem): Observable<void> {
    return this.http.put('presenca', presenca);
  }
}
