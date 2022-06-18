import { TipoAtividadeCod } from './atividades';

export interface DadosCertificados {
  id: number;
  data_inicio: string;
  data_fim: string;
  percentual_presenca: number;
  tema: string;
  titulo: string;
  duracao_atividade: number;
  numero_edicao: number;
  carregando?: boolean;
  cod_tipo: TipoAtividadeCod;
}
