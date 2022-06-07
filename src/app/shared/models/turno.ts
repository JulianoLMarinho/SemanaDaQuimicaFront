import { BaseModel } from './baseModel';
import { DiaHoraAtividade } from './diaHora';

export interface Turno extends BaseModel {
  nome_turno: string;
  edicao_semana_id: number;
  horarios?: DiaHoraAtividade[];
}
