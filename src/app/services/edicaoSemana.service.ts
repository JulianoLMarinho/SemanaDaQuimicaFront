import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CarouselImage,
  CarouselImageCreate,
} from '../shared/models/carouselImage';
import { EdicaoSemana } from '../shared/models/edicao-semana';
import { CoresEdicaoService } from './coresEdicao.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class EdicaoSemanaService {
  semanaSelecionada!: EdicaoSemana | null;
  semanaAtiva!: EdicaoSemana;
  loadingSemanaAtiva = true;

  constructor(
    private http: HttpService,
    private coresEdicaoService: CoresEdicaoService
  ) {
    this.getDetalhes().subscribe((edicao) => {
      this.semanaAtiva = edicao;
      this.coresEdicaoService.obterCoresEdicao(edicao.id).subscribe((cores) => {
        this.coresEdicaoService.carregarCores(cores);
        this.loadingSemanaAtiva = false;
      });
    });
  }

  getDetalhes(): Observable<EdicaoSemana> {
    return this.http.get<EdicaoSemana>('edicaoSemana');
  }

  updateTemaEdicaoAtiva(tema: any) {
    return this.http.put('edicaoSemana/tema', tema);
  }

  getEdicoes(): Observable<EdicaoSemana[]> {
    return this.http.get<EdicaoSemana[]>('edicaoSemana/edicoes').pipe(
      tap((res) => {
        return res.map((ed) => {
          ed.parsed_data_fim = new Date(ed.data_fim + 'T00:00:00-0300');
          ed.parsed_data_inicio = new Date(ed.data_inicio + 'T00:00:00-0300');
          return ed;
        });
      })
    );
  }

  salvarCarrousselImage(carroussel: CarouselImageCreate): Observable<void> {
    return this.http.post('edicaoSemana/carousel-image', carroussel);
  }

  editarCarrousselImage(carroussel: CarouselImage): Observable<void> {
    return this.http.put('edicaoSemana/carousel-image', carroussel);
  }

  getCarouselEdicao(edicaoId: number): Observable<CarouselImage[]> {
    return this.http.get<CarouselImage[]>(
      'edicaoSemana/carousel-edicao/' + edicaoId
    );
  }

  deletarCarouselImage(carouselImageId: number): Observable<void> {
    return this.http.delete(`edicaoSemana/carousel-image/${carouselImageId}`);
  }

  editarEdicaoSemana(edicaoSemana: EdicaoSemana): Observable<boolean> {
    return this.http.put('edicaoSemana', edicaoSemana);
  }
}
