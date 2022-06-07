export interface CarouselImageCreate {
  edicao_semana_id: number;
  imagem: string;
  titulo?: string;
  subtitulo?: string;
  ordem: number;
}
export interface CarouselImage extends CarouselImageCreate {
  id: number;
}
