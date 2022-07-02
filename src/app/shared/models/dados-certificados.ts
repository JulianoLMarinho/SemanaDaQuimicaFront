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

export interface CertificadoExportacao {
  nome_aluno: string;
  texto_data: string;
  titulo_atividade: string;
  duracao_atividade: string;
  numero_edicao: number;
  data_atual: string;
  responsaveis: string;
  tipo: string;
  logo_semana: string;
}
