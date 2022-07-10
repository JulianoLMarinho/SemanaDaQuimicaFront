import { Injectable } from '@angular/core';
import * as moment from 'moment';
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
  diasSemana = [
    {
      sigla: 'S',
      weekDay: 1,
      date: new Date(),
      parsedDate: '',
      parsedShortDate: '',
    },
    {
      sigla: 'T',
      weekDay: 2,
      date: new Date(),
      parsedDate: '',
      parsedShortDate: '',
    },
    {
      sigla: 'Q',
      weekDay: 3,
      date: new Date(),
      parsedDate: '',
      parsedShortDate: '',
    },
    {
      sigla: 'Q',
      weekDay: 4,
      date: new Date(),
      parsedDate: '',
      parsedShortDate: '',
    },
    {
      sigla: 'S',
      weekDay: 5,
      date: new Date(),
      parsedDate: '',
      parsedShortDate: '',
    },
  ];

  constructor(
    private http: HttpService,
    private coresEdicaoService: CoresEdicaoService
  ) {
    this.getDetalhes().subscribe((edicao) => {
      this.semanaAtiva = edicao;
      this.coresEdicaoService.obterCoresEdicao(edicao.id).subscribe((cores) => {
        if (cores) {
          this.coresEdicaoService.carregarCores(cores);
        }
        this.loadingSemanaAtiva = false;
      });
    });
  }

  selecionaSemana(semana: EdicaoSemana) {
    this.semanaSelecionada = semana;
    let diaInicioReferencia = <Date>semana.parsed_data_inicio;
    for (let i of this.diasSemana) {
      const day = diaInicioReferencia.getDay();
      const diaSemana = this.diasSemana.find((x) => x.weekDay === day);
      if (diaSemana) {
        diaSemana.date = new Date(diaInicioReferencia);
        diaSemana.parsedDate = moment(diaSemana.date).format('DD/MM/yyyy');
        // moment.locale('pt-br');
        diaSemana.parsedShortDate = moment(diaSemana.date).format('DD/MM');
      }
      diaInicioReferencia.setDate(diaInicioReferencia.getDate() + 1);
    }
  }

  getDetalhes(): Observable<EdicaoSemana> {
    return this.http.get<EdicaoSemana>('edicaoSemana', true);
  }

  updateTemaEdicaoAtiva(tema: any) {
    return this.http.put('edicaoSemana/tema', tema);
  }

  getEdicoes(): Observable<EdicaoSemana[]> {
    return this.http.get<EdicaoSemana[]>('edicaoSemana/edicoes', true).pipe(
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
      'edicaoSemana/carousel-edicao/' + edicaoId,
      true
    );
  }

  deletarCarouselImage(carouselImageId: number): Observable<void> {
    return this.http.delete(`edicaoSemana/carousel-image/${carouselImageId}`);
  }

  editarEdicaoSemana(edicaoSemana: EdicaoSemana): Observable<boolean> {
    return this.http.put('edicaoSemana', edicaoSemana);
  }

  liberarCertificado(
    edicaoSemanaId: number,
    liberar: boolean
  ): Observable<void> {
    return this.http.put(
      `edicaoSemana/liberar-certificado/${edicaoSemanaId}/${liberar}`
    );
  }

  aceitarInscricoesAtividades(
    edicaoSemanaId: number,
    aceitarInscricoes: boolean
  ): Observable<void> {
    return this.http.put(
      `edicaoSemana/aceitar-inscricao-atividade/${edicaoSemanaId}/${aceitarInscricoes}`
    );
  }

  salvarLogo(
    edicaoSemanaId: number,
    logo: string,
    logo_tipo: string
  ): Observable<void> {
    return this.http.post('edicaoSemana/salvar-logo', {
      edicao_semana_id: edicaoSemanaId,
      logo: logo,
      tipo_logo: logo_tipo,
    });
  }

  siteEmConstrucao(
    edicaoSemanaId: number,
    siteEmConstrucao: boolean
  ): Observable<void> {
    return this.http.put(
      `edicaoSemana/site-em-construcao/${edicaoSemanaId}/${siteEmConstrucao}`
    );
  }

  salvarAssinatura(assinatura: any, edicaoSemanaId: number) {
    const obj = {
      edicao_semana_id: edicaoSemanaId,
      tipo_assinatura: assinatura.tipo,
      assinatura: assinatura.assinatura,
      nome: assinatura.nome,
    };
    return this.http.post('edicaoSemana/salvar-assinatura', obj);
  }

  streamValuesTest() {
    const ret = new EventSource(
      'http://localhost:8000/edicaoSemana/stream-results'
    );
    return ret;
  }
}
