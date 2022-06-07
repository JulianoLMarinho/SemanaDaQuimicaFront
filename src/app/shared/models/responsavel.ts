import { SafeResourceUrl } from '@angular/platform-browser';
import { BaseModel } from './baseModel';

export interface Responsavel extends BaseModel {
  nome_responsavel: string;
  descricao_responsavel: string;
  id_lattes: string;
  foto?: string;
  fotoEnc?: SafeResourceUrl;
  pagina_url?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}
