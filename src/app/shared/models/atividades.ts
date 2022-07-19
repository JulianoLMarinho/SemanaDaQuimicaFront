import { DiaHoraAtividade } from './diaHora';
import { Responsavel } from './responsavel';

export interface Atividade {
  id: number;
  edicao_semana_id: number;
  ativa: boolean;
  tipo_atividade: number;
  dia_hora_atividade_id?: null;
  descricao_atividade: string;
  responsavel_atividade?: null;
  vagas: number;
  valor?: number;
  titulo: string;
}

export interface AtividadeLista {
  id: number;
  titulo: string;
  ativa: boolean;
  descricao_atividade?: string;
  vagas: number;
  nome_tipo?: string;
  tipo_atividade?: number;
  nome_turno?: string;
  cod_tipo?: string;
  turno_id?: number;
  responsaveis?: Responsavel[];
  responsaveisMap?: string[];
  horarios?: DiaHoraAtividade[];
  aceita_inscricao: boolean;
  selecionada?: boolean;
  valor?: number;
  total_inscritos?: number;
  ja_salvo?: boolean;
  duracao?: number;
  atividade_presencial: boolean;
  local?: string;
  link?: string;
}

export interface OpcaoSelect {
  value: number | boolean;
  name: string;
}

export interface TipoAtividade {
  id: number;
  nome_tipo: string;
  descricao_tipo: string;
  cod_tipo: TipoAtividadeCod;
}

// Generated by https://quicktype.io

export interface AtividadeTurno {
  turno_id: number;
  turno: Turno;
  atividades: AtividadeLista[];
}

export interface Turno {
  nome_turno: string;
  edicao_semana_id: number;
  id: number;
  hor_inicio?: string;
  hor_fim?: string;
  duracao?: number;
  horarios: DiaHoraAtividade[];
}

export interface ResponsavelAtividade {
  id: number;
  id_atividade: number;
  nome_responsavel: string;
  descricao_responsavel: string;
  id_lattes: string;
}

export type TipoAtividadeCod =
  | 'CURSO'
  | 'PALESTRA'
  | 'WORKSHOP'
  | 'VISITA_TECNICA';
