import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
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
  constructor(private edicaoSemanaService: EdicaoSemanaService) {
    this.semanaAtiva = this.edicaoSemanaService.semanaAtiva;
  }

  ngOnInit() {}

  public downloadAsPDF() {
    var doc = new jsPDF('landscape', 'px', [1096, 795]);
    this.exportando = true;

    setTimeout(() => {
      doc.html(this.pdfTable.nativeElement, {
        callback: this.saveDoc.bind(this, doc),
        x: 0,
        y: 0,
      });
    }, 500);
  }

  saveDoc(doc: jsPDF) {
    doc.save('test');
    this.exportando = false;
  }
}
