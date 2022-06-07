export interface DiaHoraAtividade {
  id: number;
  hora_inicio: string;
  hora_fim: string;
  turno_id?: number;
  atividade_edicao_id?: number;
  dia: number;
}
