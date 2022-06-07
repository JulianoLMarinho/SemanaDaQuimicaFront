export enum StatusInscricaoLabel {
  AGUARDANDO_PAGAMENTO = 'Aguardando Pagamento',
  PAGAMENTO_INFORMADO = 'Pagamento Informado',
  CANCELADA = 'Cancelada',
  PAGAMENTO_CONFIRMADO = 'Confirmada',
}

export type StatusInscricao = keyof typeof StatusInscricaoLabel;
