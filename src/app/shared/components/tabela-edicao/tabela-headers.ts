export interface TabelaHeaders {
  property: string;
  name: string;
  valueFormatter?: (arg: any) => string;
  show: boolean;
  tableStyle?: any;
}
