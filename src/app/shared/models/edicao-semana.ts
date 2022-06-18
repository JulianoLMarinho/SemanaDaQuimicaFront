import { Responsavel } from './responsavel';

export interface EdicaoSemana {
  id: number;
  titulo: string;
  tema: string;
  data_inicio: string;
  data_fim: string;
  parsed_data_inicio: Date;
  parsed_data_fim: Date;
  ativa: boolean;
  numero_edicao: number;
  quem_somos?: string;
  comissao_edicao?: Responsavel[];
  certificado_liberado: boolean;
}
