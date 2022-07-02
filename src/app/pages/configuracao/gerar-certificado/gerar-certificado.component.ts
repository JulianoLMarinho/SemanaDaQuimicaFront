import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AtividadesService } from 'src/app/services/atividades.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
import { PresencaService } from 'src/app/services/presenca.service';
import { CertificadoExportComponent } from 'src/app/shared/components/certificado-export/certificado-export.component';
import { ModalFieldConfiguration } from 'src/app/shared/components/modal-adicionar-editar/modal-field-configuration';
import { AtividadeLista } from 'src/app/shared/models/atividades';
import { BaseModel } from 'src/app/shared/models/baseModel';
import { CertificadoExportacao } from 'src/app/shared/models/dados-certificados';
import { BaseConfiguracaoComponent } from '../base-configuracao/base-configuracao.component';

@Component({
  selector: 'app-gerar-certificado',
  templateUrl: './gerar-certificado.component.html',
  styleUrls: ['./gerar-certificado.component.scss'],
})
export class GerarCertificadoComponent extends BaseConfiguracaoComponent {
  atividades: AtividadeLista[] = [];
  atividadeSelecionada!: AtividadeLista;
  nomeAluno: string = '';
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
    public edicaoService: EdicaoSemanaService,
    public toastService: ToastrService,
    private atividadesService: AtividadesService,
    public coresEdicao: CoresEdicaoService,
    public authService: AuthenticationService
  ) {
    super(edicaoService, toastService);
  }

  loadEntidade(): void {
    this.atividadesService
      .getAtividadesCertificadosByEdicaoInscricao(
        this.edicaoService.semanaSelecionada!.id
      )
      .subscribe(
        (atividades) => {
          this.atividades = atividades;
          this.atividades.map((x) => {
            let duration = 0;
            let startDisplay = '';
            let endDisplay = '';
            if (x.horarios) {
              x.horarios.map((y) => {
                const start = moment('2000-01-01T' + y.hora_inicio);
                const end = moment('2000-01-01T' + y.hora_fim);
                startDisplay = start.format('hh[h]mm');
                endDisplay = end.format('hh[h]mm');
                duration += end.diff(start);
              });
            }
            x.duracao = duration;
            return x;
          });
          console.log(this.atividades);
        },
        (_) => {
          this.toastService.error('Erro ao carregar presença');
        },
        () => {
          // this.carregandoPresenca = false;
        }
      );
  }

  obterModelo(
    entidadeEdicao?: BaseModel | undefined
  ): ModalFieldConfiguration[] {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    super.ngOnInit();
  }

  selectAtividade() {
    moment.locale('pt-br');
    const inicio = moment(this.edicaoService.semanaSelecionada?.data_inicio);
    const fim = moment(this.edicaoService.semanaSelecionada?.data_fim);
    let textoData = '';
    if (inicio.month() === fim.month()) {
      textoData = `de ${inicio.format('DD')} a ${fim.format('DD [de] MMMM')}`;
    }
    if (this.atividadeSelecionada.duracao) {
      this.dadosCertificado.duracao_atividade = (
        this.atividadeSelecionada.duracao / 3600000.0
      ).toLocaleString();
    }
    this.dadosCertificado.titulo_atividade = this.atividadeSelecionada.titulo;
    this.dadosCertificado.numero_edicao =
      this.edicaoService.semanaSelecionada?.numero_edicao!;
    this.dadosCertificado.texto_data = textoData;
    this.dadosCertificado.data_atual = moment(new Date()).format(
      'DD [de] MMMM [de] YYYY'
    );
    this.dadosCertificado.responsaveis = this.atividadeSelecionada
      .responsaveis!.map((x) => x.nome_responsavel)
      .join(', ');

    switch (this.atividadeSelecionada.cod_tipo) {
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
    this.dadosCertificado.logo_semana = this.edicaoSelecionada?.logo_completa!;
  }

  downloadCertificado() {
    this.dadosCertificado.nome_aluno = this.nomeAluno;
    this.certificadoExportComponent.downloadAsPDF();
  }
}
