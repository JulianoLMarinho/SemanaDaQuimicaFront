// Generated by https://quicktype.io

import { Atividade } from './atividades';
import { StatusInscricao, StatusInscricaoLabel } from './statusInscricao';

export interface Inscricao {
  edicao_semana_id: number;
  status: StatusInscricao;
  usuario_id: number;
  valor: number;
  numero_comprovante?: string;
  titular_comprovante?: string;
  id_comprovante?: string;
  id: number;
  atividades?: Atividade[];
  carregandoAtividades?: boolean;
  status_nome?: string;
  camisa_kit: boolean;
  cotista_sbq: boolean;
  nome?: string;
  email?: string;
  numero_edicao?: number;
}

export interface AtividadeInscricao {
  atividade_id: number;
  inscricao_id: number;
  status: StatusInscricao;
  camisa_kit: boolean;
  cotista_sbq: boolean;
}

export interface AlunoAtividade {
  inscricao_id: number;
  edicao_semana_id: number;
  aluno_nome: string;
  atividade_titulo: string;
}
