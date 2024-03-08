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
  logo_completa?: string;
  logo?: string;
  aceita_inscricao_atividade: boolean;
  site_em_construcao: boolean;
  presidente_edicao?: string;
  assinatura_presidente_edicao?: string;
  direcao_instituto?: string;
  assinatura_direcao_instituto?: string;
  como_chegar?: string;
  fale_conosco?: string;
  texto_pagamento?: string;
  foto_camisa?: string;
  valor_camisa?: string;
}
