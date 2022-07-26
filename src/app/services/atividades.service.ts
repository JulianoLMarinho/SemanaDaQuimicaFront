import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Atividade,
  AtividadeLista,
  AtividadeTurno,
  OpcaoSelect,
  TipoAtividade,
} from '../shared/models/atividades';
import { DadosCertificados } from '../shared/models/dados-certificados';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AtividadesService {
  constructor(private http: HttpService) {}

  getAtividadesByEdicao(idEdicao: number): Observable<AtividadeLista[]> {
    return this.http.get<AtividadeLista[]>('atividades/' + idEdicao);
  }

  getAtividadesByEdicaoAndTipo(
    idEdicao: number,
    tipo: string
  ): Observable<AtividadeLista[]> {
    return this.http.get<AtividadeLista[]>(
      'atividades/' + idEdicao + '/' + tipo,
      true
    );
  }

  getAtividadesByEdicaoInscricao(
    idEdicao: number
  ): Observable<AtividadeLista[]> {
    return this.http.get<AtividadeLista[]>(
      'atividades/inscricao?idEdicao=' + idEdicao
    );
  }

  getAtividadesCertificadosByEdicaoInscricao(
    idEdicao: number
  ): Observable<AtividadeLista[]> {
    return this.http.get<AtividadeLista[]>(
      'atividades/atividades-certificado?idEdicao=' + idEdicao
    );
  }

  getAtividadesByEdicaoTurnoAndTipo(
    idEdicao: number,
    tipo: string
  ): Observable<AtividadeTurno[]> {
    return this.http.get<AtividadeTurno[]>(
      'atividades/turno/' + idEdicao + '/' + tipo,
      true
    );
  }

  getTipoAtividades(): Observable<OpcaoSelect[]> {
    return this.http.get<OpcaoSelect[]>('atividades/tipoAtividade');
  }

  criarEditarAtividade(atividade: any): Observable<boolean> {
    return this.http.put<any, boolean>('atividades', atividade);
  }

  obterListaCertificadoUsuario(
    usuarioId: number
  ): Observable<DadosCertificados[]> {
    return this.http.get<DadosCertificados[]>('atividades/lista-certificados');
  }

  obterTotaisAtividades(edicaoId: number): Observable<any[]> {
    return this.http.get<any[]>('atividades/totais/' + edicaoId);
  }
}
