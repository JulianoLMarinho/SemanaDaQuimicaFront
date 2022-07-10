import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atividade } from '../shared/models/atividades';
import { AtividadeInscricao, Inscricao } from '../shared/models/inscricao';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class InscricaoService {
  constructor(private http: HttpService) {}

  criarInscricao(inscricao: any): Observable<void> {
    return this.http.post('inscricao', inscricao);
  }

  obterAtividadesInscricao(
    usuarioId: number
  ): Observable<AtividadeInscricao[]> {
    return this.http.get<AtividadeInscricao[]>('inscricao/' + usuarioId);
  }

  obterInscricoesResumo(usuarioId: number): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(`inscricao/${usuarioId}/resumo`);
  }

  obterInscricoesConfirmacao(): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(`inscricao/confirmacao`);
  }

  obterAtividadesInscricaoUsuario(
    inscricaoId: number
  ): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(
      `inscricao/atividade/usuario/${inscricaoId}`
    );
  }

  informarPagamento(
    inscricaoId: number,
    numeroDocumento: string
  ): Observable<void> {
    return this.http.put('inscricao/pagamento', {
      inscricao_id: inscricaoId,
      numero_documento: numeroDocumento,
    });
  }

  cancelarInscricao(inscricaoId: number): Observable<void> {
    return this.http.delete(`inscricao/${inscricaoId}`);
  }

  confirmarInscricao(inscricaoId: number): Observable<void> {
    return this.http.put(`inscricao/confirmacao/${inscricaoId}`, null);
  }

  totalInscricoesPagamentoInformado(): Observable<number> {
    return this.http.get<number>('inscricao/total-pagamento-informado');
  }
}