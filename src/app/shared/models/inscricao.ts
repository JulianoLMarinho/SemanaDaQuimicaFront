// Generated by https://quicktype.io

import { Atividade } from './atividades';
import { StatusInscricao, StatusInscricaoLabel } from './statusInscricao';

export interface Inscricao {
  edicao_semana_id: number;
  status: StatusInscricao;
  usuario_id: number;
  valor: number;
  numero_comprovante?: string;
  id: number;
  atividades?: Atividade[];
  carregandoAtividades?: boolean;
  status_nome?: string;
}

export interface AtividadeInscricao {
  atividade_id: number;
  inscricao_id: number;
  status: StatusInscricao;
}