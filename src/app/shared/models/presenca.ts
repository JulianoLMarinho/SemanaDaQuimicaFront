export interface Presenca {
  id: number;
  atividade_id: number;
  nome: string;
  presencas: PresencaItem[];
}

export interface PresencaItem {
  dia: number;
  inscricao_atividade_id?: number;
  inteira: boolean;
  meia: boolean;
}
