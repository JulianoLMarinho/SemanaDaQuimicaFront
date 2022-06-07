import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OpcaoSelect } from '../shared/models/atividades';
import { Turno } from '../shared/models/turno';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  constructor(private http: HttpService) {}

  getTurnosByEdicao(edicaoId: number): Observable<Turno[]> {
    return this.http.get<Turno[]>('turnos/' + edicaoId);
  }

  getTurnosSelecaoByEdicao(edicaoId: number): Observable<OpcaoSelect[]> {
    return this.http.get<OpcaoSelect[]>('turnos/turnos-selecao/' + edicaoId);
  }

  criarTurno(turno: any): Observable<boolean> {
    return this.http.post<boolean, any>('turnos', turno);
  }
}
