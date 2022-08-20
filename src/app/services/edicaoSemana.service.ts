import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Aviso } from '../shared/models/aviso';
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
  loadingSemanaAtivaSubject = new Subject<EdicaoSemana>();
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
      if (edicao) {
        this.semanaAtiva = edicao;
        this.semanaSelecionada = edicao;
        this.loadingSemanaAtivaSubject.next(edicao);
        this.coresEdicaoService
          .obterCoresEdicao(edicao.id)
          .subscribe((cores) => {
            if (cores) {
              this.coresEdicaoService.carregarCores(cores);
            }
            this.loadingSemanaAtiva = false;
          });
      } else {
        const edicao: EdicaoSemana = {
          data_fim: '01-01-2022',
          parsed_data_fim: new Date(),
          data_inicio: '01-01-2022',
          parsed_data_inicio: new Date(),
          id: 0,
          aceita_inscricao_atividade: false,
          ativa: true,
          certificado_liberado: false,
          numero_edicao: 0,
          site_em_construcao: true,
          tema: 'Edição Em Construção',
          titulo: 'Edição em Construção',
        };
        this.semanaAtiva = edicao;
        this.semanaSelecionada = edicao;
        this.loadingSemanaAtivaSubject.next(edicao);
        this.loadingSemanaAtiva = false;
      }
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
    return this.http.get<EdicaoSemana>('edicaosemana', true);
  }

  updateTemaEdicaoAtiva(tema: any) {
    return this.http.put('edicaosemana/tema', tema);
  }

  getEdicoes(): Observable<EdicaoSemana[]> {
    return this.http.get<EdicaoSemana[]>('edicaosemana/edicoes', true).pipe(
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
    return this.http.post('edicaosemana/carousel-image', carroussel);
  }

  editarCarrousselImage(carroussel: CarouselImage): Observable<void> {
    return this.http.put('edicaosemana/carousel-image', carroussel);
  }

  getCarouselEdicao(edicaoId: number): Observable<CarouselImage[]> {
    return this.http.get<CarouselImage[]>(
      'edicaosemana/carousel-edicao/' + edicaoId,
      true
    );
  }

  deletarCarouselImage(carouselImageId: number): Observable<void> {
    return this.http.delete(`edicaosemana/carousel-image/${carouselImageId}`);
  }

  editarEdicaoSemana(edicaoSemana: EdicaoSemana): Observable<boolean> {
    return this.http.put('edicaosemana', edicaoSemana);
  }

  liberarCertificado(
    edicaoSemanaId: number,
    liberar: boolean
  ): Observable<void> {
    return this.http.put(
      `edicaosemana/liberar-certificado/${edicaoSemanaId}/${liberar}`
    );
  }

  aceitarInscricoesAtividades(
    edicaoSemanaId: number,
    aceitarInscricoes: boolean
  ): Observable<void> {
    return this.http.put(
      `edicaosemana/aceitar-inscricao-atividade/${edicaoSemanaId}/${aceitarInscricoes}`
    );
  }

  salvarLogo(
    edicaoSemanaId: number,
    logo: string,
    logo_tipo: string
  ): Observable<void> {
    return this.http.post('edicaosemana/salvar-logo', {
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
      `edicaosemana/site-em-construcao/${edicaoSemanaId}/${siteEmConstrucao}`
    );
  }

  salvarAssinatura(assinatura: any, edicaoSemanaId: number) {
    const obj = {
      edicao_semana_id: edicaoSemanaId,
      tipo_assinatura: assinatura.tipo,
      assinatura: assinatura.assinatura,
      nome: assinatura.nome,
    };
    return this.http.post('edicaosemana/salvar-assinatura', obj);
  }

  salvarQuemSomos(quemSomos: string, edicaoSemanaId: number): Observable<void> {
    return this.http.put('edicaosemana/quem-somos', {
      quem_somos: quemSomos,
      edicao_semana_id: edicaoSemanaId,
    });
  }

  obterAvisos(semanaId: number): Observable<Aviso[]> {
    return this.http.get<Aviso[]>('edicaosemana/avisos/' + semanaId);
  }

  salvarAviso(aviso: Aviso): Observable<boolean> {
    return this.http.post<boolean, Aviso>('edicaosemana/aviso', aviso);
  }

  updateAviso(aviso: Aviso): Observable<boolean> {
    return this.http.put<boolean, Aviso>('edicaosemana/aviso', aviso);
  }

  obterAvisosPorData(
    edicao: number,
    data_criacao: string
  ): Observable<Aviso[]> {
    return this.http.post<Aviso[], any>('edicaosemana/avisos/obter-data', {
      edicao_semana_id: edicao,
      data_criacao: data_criacao,
    });
  }

  deletarAviso(avisoId: number): Observable<boolean> {
    return this.http.delete<boolean>('edicaosemana/avisos/' + avisoId);
  }
}
