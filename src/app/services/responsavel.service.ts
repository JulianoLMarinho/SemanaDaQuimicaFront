import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OpcaoSelect } from '../shared/models/atividades';
import { Responsavel } from '../shared/models/responsavel';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelService {
  constructor(private http: HttpService) {}

  getReponsaveis(): Observable<OpcaoSelect[]> {
    return this.http.get<OpcaoSelect[]>('responsavel');
  }

  getResponsaveisList(): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>('responsavel/getAll');
  }

  salvarNovoResponsavel(responsavel: any): Observable<boolean> {
    return this.http.post<boolean, any>('responsavel', responsavel);
  }

  getComissaoEdicao(edicaoSemanaId: number): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(
      'edicaoSemana/quem-somos/' + edicaoSemanaId
    );
  }
}
