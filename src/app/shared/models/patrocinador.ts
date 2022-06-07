import { SafeResourceUrl } from '@angular/platform-browser';

export interface PatrocinadorCreate {
  imagem: string;
  nome: string;
  ordem: number;
  link: string;
  edicao_semana_id: number;
}

export interface Patrocinador extends PatrocinadorCreate {
  id: number;
  add?: boolean;
  sanitizedImagem?: SafeResourceUrl;
}
