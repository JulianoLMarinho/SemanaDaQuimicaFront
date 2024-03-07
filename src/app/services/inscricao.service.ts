import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atividade } from '../shared/models/atividades';
import {
  AlunoAtividade,
  AtividadeInscricao,
  Inscricao,
} from '../shared/models/inscricao';
import { InscricoesEdicao } from '../shared/models/tabelas-exportacao';
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
    usuarioId: number,
    edicaoSemanaId?: number
  ): Observable<AtividadeInscricao[]> {
    return this.http.get<AtividadeInscricao[]>(
      'inscricao/' + usuarioId,
      undefined,
      { edicaoSemana: edicaoSemanaId }
    );
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

  obterInscricoesPorAtividade(atividadeId: number): Observable<any[]> {
    return this.http.get<any[]>('inscricao/usuarios/' + atividadeId);
  }

  obterInscricoesPorEdicao(edicaoId: number): Observable<InscricoesEdicao[]> {
    return this.http.get<InscricoesEdicao[]>(
      'inscricao/inscritos/edicao/' + edicaoId
    );
  }

  obterPrimeiroCursoUsuario(edicaoId: number): Observable<any[]> {
    return this.http.get<any[]>('inscricao/primeiro-curso/' + edicaoId);
  }

  obterListaDados(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }

  obterAtividadesAlunos(
    edicaoId: number,
    atividadeId?: number
  ): Observable<AlunoAtividade[]> {
    return this.http.get<AlunoAtividade[]>(
      `inscricao/inscritos-atividades-edicao/${edicaoId}`,
      false,
      atividadeId && { atividade_id: atividadeId }
    );
  }
}
