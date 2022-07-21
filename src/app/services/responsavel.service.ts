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

  getReponsaveis(tipo: string = 'responsavel'): Observable<OpcaoSelect[]> {
    return this.http.get<OpcaoSelect[]>('responsavel?tipo=' + tipo);
  }

  getResponsaveisList(): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>('responsavel/getAll');
  }

  getComissao(semanaEdicaoId: number): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(
      'responsavel/comissao/' + semanaEdicaoId
    );
  }

  salvarNovoResponsavel(responsavel: any): Observable<boolean> {
    return this.http.post<boolean, any>('responsavel', responsavel);
  }

  salvarComissao(responsavel: any): Observable<boolean> {
    return this.http.post<boolean, any>('responsavel/comissao', responsavel);
  }

  atualizarComissao(responsavel: any): Observable<boolean> {
    return this.http.put<boolean, any>('responsavel/comissao', responsavel);
  }

  getComissaoEdicao(edicaoSemanaId: number): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(
      'edicaoSemana/quem-somos/' + edicaoSemanaId
    );
  }

  getResponsaveisByAtividade(atividadeId: number): Observable<string[]> {
    return this.http.get<string[]>('responsavel/atividade/' + atividadeId);
  }

  deletarResponsavel(responsavel_id: number): Observable<boolean> {
    return this.http.delete('responsavel/' + responsavel_id);
  }
}
