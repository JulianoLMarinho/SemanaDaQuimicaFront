import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { AtividadesService } from 'src/app/services/atividades.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
import { InscricaoService } from 'src/app/services/inscricao.service';
import { ResponsavelService } from 'src/app/services/responsavel.service';
import { CertificadoExportComponent } from 'src/app/shared/components/certificado-export/certificado-export.component';
import {
  CertificadoExportacao,
  DadosCertificados,
} from 'src/app/shared/models/dados-certificados';
import { Inscricao } from 'src/app/shared/models/inscricao';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-meus-certificados',
  templateUrl: './meus-certificados.component.html',
  styleUrls: ['./meus-certificados.component.scss'],
})
export class MeusCertificadosComponent implements OnInit {
  atividades: DadosCertificados[] = [];
  dadosCertificado: CertificadoExportacao = {
    nome_aluno: '',
    texto_data: '',
    titulo_atividade: '',
    duracao_atividade: '',
    numero_edicao: 0,
    data_atual: '',
    responsaveis: '',
    tipo: '',
    logo_semana: '',
  };

  @ViewChild(CertificadoExportComponent)
  certificadoExportComponent!: CertificadoExportComponent;

  constructor(
    private atividadesService: AtividadesService,
    public authService: AuthenticationService,
    public coresService: CoresEdicaoService,
    private responsavelService: ResponsavelService,
    private edicaoService: EdicaoSemanaService
  ) {}

  ngOnInit() {
    this.carregarCertificados();
  }

  carregarCertificados() {
    this.atividadesService
      .obterListaCertificadoUsuario(this.authService.usuarioLogado!.id)
      .subscribe((res) => {
        this.atividades = res;
      });
  }

  async prepararDadosCertificado(info: DadosCertificados) {
    this.responsavelService
      .getResponsaveisByAtividade(info.id)
      .subscribe((responsaveis) => {
        info.carregando = true;
        moment.locale('pt-br');
        const inicio = moment(info.data_inicio);
        const fim = moment(info.data_fim);
        console.log(inicio.format('DD [de] MMMM'));
        let textoData = '';
        if (inicio.month() === fim.month()) {
          textoData = `de ${inicio.format('DD')} a ${fim.format(
            'DD [de] MMMM'
          )}`;
        }
        this.dadosCertificado.texto_data = textoData;
        this.dadosCertificado.titulo_atividade =
          info.titulo.toLocaleUpperCase();
        this.dadosCertificado.duracao_atividade = (
          info.duracao_atividade / 3600.0
        ).toLocaleString();
        this.dadosCertificado.numero_edicao = info.numero_edicao;
        this.dadosCertificado.data_atual = moment(new Date()).format(
          'DD [de] MMMM [de] YYYY'
        );

        this.dadosCertificado.responsaveis = responsaveis
          .join(', ')
          .replace(/, ([^,]*)$/, ' e $1');

        switch (info.cod_tipo) {
          case 'CURSO':
            this.dadosCertificado.tipo = 'do curso';
            break;
          case 'VISITA_TECNICA':
            this.dadosCertificado.tipo = 'da visita técnica';
            break;
          case 'WORKSHOP':
            this.dadosCertificado.tipo = 'do workshop';
            break;
          case 'PALESTRA':
            this.dadosCertificado.tipo = 'da palestra';
            break;
        }
      });
    this.dadosCertificado.logo_semana =
      this.edicaoService.semanaAtiva?.logo_completa!;
    await this.downloadCertificado();
    info.carregando = false;
  }

  async downloadCertificado() {
    const alutoAtivo = this.authService.usuarioLogado;
    this.dadosCertificado.nome_aluno = alutoAtivo?.nome!;
    await this.certificadoExportComponent.downloadAsPDF();
  }
}
