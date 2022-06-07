import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Patrocinador,
  PatrocinadorCreate,
} from '../shared/models/patrocinador';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class PatrocinadorService {
  constructor(private http: HttpService) {}

  salvarPatrocinador(patrocinador: PatrocinadorCreate): Observable<void> {
    return this.http.post('patrocinador', patrocinador);
  }

  obterPatrocinadoresEdicao(
    edicao_semana_id: number
  ): Observable<Patrocinador[]> {
    return this.http.get<Patrocinador[]>(
      `patrocinador/${edicao_semana_id}`,
      true
    );
  }

  atualizarPatrocinador(patrocinador: Patrocinador): Observable<void> {
    return this.http.put('patrocinador', patrocinador);
  }

  deletarPatrocinador(patrocinadorId: number): Observable<void> {
    return this.http.delete('patrocinador/' + patrocinadorId);
  }
}
