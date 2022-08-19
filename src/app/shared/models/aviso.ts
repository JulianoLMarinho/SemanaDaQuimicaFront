import { BaseModel } from './baseModel';

export interface Aviso extends BaseModel {
  edicao_semana_id: number;
  titulo: string;
  texto: string;
  data_criacao?: string;
  notificacao_aberta?: boolean;
}
