import { ModalFieldConfiguration } from '../components/modal-adicionar-editar/modal-field-configuration';

export interface TabelasObject<T> {
  nome: string;
  filtros: FiltroTabela<T>[];
  loadTabela: (tabela: TabelasObject<T>) => void;
  dados: T[];
  obterModelo: (entidade: T) => ModalFieldConfiguration[];
}

export interface FiltroTabela<T> {
  nome: string;
  opcoes?: (tabela: TabelasObject<T>) => void;
  opcoesLista: any[];
  opcaoSelecionada: any;
  loading: boolean;
  selecionarAcao: (tabela: TabelasObject<T>) => void;
  opcaoLabel: (entidade: any) => string;
}

export interface InscricoesEdicao {
  nome: string;
  email: string;
  nivel: string;
  curso: string;
  universidade: string;
  tamanho_camisa: string;
  genero: string;
  numero_atividades: number;
}
