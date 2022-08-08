import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { CertificadoExportacao } from '../../models/dados-certificados';
import { EdicaoSemana } from '../../models/edicao-semana';

@Component({
  selector: 'app-certificado-export',
  templateUrl: './certificado-export.component.html',
  styleUrls: ['./certificado-export.component.scss'],
})
export class CertificadoExportComponent implements OnInit {
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  exportando = false;
  @Input() dadosCertificado: CertificadoExportacao = {
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

  semanaAtiva: EdicaoSemana;

  @Output() exportandoChange = new EventEmitter<boolean>();
  constructor(
    private edicaoSemanaService: EdicaoSemanaService,
    public coresSemana: CoresEdicaoService
  ) {
    this.semanaAtiva = this.edicaoSemanaService.semanaAtiva;
  }

  ngOnInit() {}

  public async downloadAsPDF() {
    return new Promise((resolve, reject) => {
      try {
        var doc = new jsPDF('landscape', 'px', [1096, 795]);
        this.exportando = true;
        this.exportandoChange.emit(true);
        setTimeout(() => {
          doc.html(this.pdfTable.nativeElement, {
            callback: this.saveDoc.bind(this, doc, resolve),
            x: 0,
            y: 0,
          });
        }, 500);
      } catch {
        reject();
      }
    });
  }

  saveDoc(doc: jsPDF, resolve: any) {
    doc.save('test');
    this.exportando = false;
    this.exportandoChange.emit(false);
    resolve();
  }
}
