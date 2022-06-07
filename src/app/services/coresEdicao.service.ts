import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { CoresEdicao } from '../shared/models/coresEdicao';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CoresEdicaoService {
  coresAtivas: CoresEdicao = {
    edicao_semana_id: 0,
    cor1: '',
    cor2: '',
    cor3: '',
    cor4: '',
    cor5: '',
    cor6: '',
  };

  coresCarregadas = new Subject();

  constructor(private http: HttpService) {
    this.coresCarregadas.next();
  }

  carregarCores(cores: CoresEdicao) {
    this.coresAtivas = cores;
    this.coresCarregadas.next();
  }

  salvarCores(coresEdicao: CoresEdicao): Observable<void> {
    return this.http.post('cores-edicao', coresEdicao);
  }

  obterCoresEdicao(edicaoId: number): Observable<CoresEdicao> {
    return this.http.get<CoresEdicao>('cores-edicao/' + edicaoId);
  }
}
