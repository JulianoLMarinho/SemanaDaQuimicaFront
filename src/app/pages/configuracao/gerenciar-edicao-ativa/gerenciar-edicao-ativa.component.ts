import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { EdicaoSemanaService } from '../../../services/edicaoSemana.service';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';
import { Assinatura } from '../../../shared/models/assinatura';
import { EdicaoSemana } from '../../../shared/models/edicao-semana';
import { GerenciarSiteComponent } from '../gerenciar-site/gerenciar-site.component';
import { Camisa } from 'src/app/shared/models/camisa';

@Component({
  selector: 'app-gerenciar-edicao-ativa',
  templateUrl: './gerenciar-edicao-ativa.component.html',
  styleUrls: ['./gerenciar-edicao-ativa.component.scss'],
})
export class GerenciarEdicaoAtivaComponent implements OnInit {
  edicaoSemanaAtiva: EdicaoSemana;
  tituloTela: string;
  salvandoConfiguracoes = false;
  editarCores = false;
  salvandoCores = false;
  salvandoAssinaturaDirecao = false;
  salvandoAssinaturaPresidente = false;
  presidenteEdicao!: Assinatura;

  direcaoInstituto!: Assinatura;

  quemSomos?: string;
  editandoQuemSomos = false;
  carregandoQuemSomos = false;
  quemSomosExpanded = false;

  comoChegar?: string;
  editandoComoChegar = false;
  carregandoComoChegar = false;
  comoChegarExpanded = false;

  faleConosco?: string;
  editandoFaleConosco = false;
  carregandoFaleConosco = false;
  faleConoscoExpanded = false;

  textoPagamento?: string;
  editandoTextoPagamento = false;
  carregandoTextoPagamento = false;
  textoPagamentoExpanded = false;

  camisaEdicao: Camisa = {
    editando: false,
    salvando: false,
  };

  @ViewChild(GerenciarSiteComponent)
  gerenciarSiteComponent!: GerenciarSiteComponent;

  constructor(
    private edicaoService: EdicaoSemanaService,
    public coresEdicao: CoresEdicaoService,
    public toastService: ToastrService,
    private modalService: NgbModal
  ) {
    this.edicaoSemanaAtiva = this.edicaoService.semanaAtiva;
    this.quemSomos = this.edicaoSemanaAtiva.quem_somos;
    this.comoChegar = this.edicaoSemanaAtiva.como_chegar;
    this.faleConosco = this.edicaoSemanaAtiva.fale_conosco;
    this.textoPagamento = this.edicaoSemanaAtiva.texto_pagamento;
    this.carregarAssinaturas();
    this.carregarCamisaEdicao();
    this.tituloTela = `Gerenciar ${this.edicaoSemanaAtiva.numero_edicao}ª Edição`;
  }

  ngOnInit() {}

  liberarCertificados() {
    this.salvandoConfiguracoes = true;
    this.edicaoService
      .liberarCertificado(
        this.edicaoSemanaAtiva.id,
        this.edicaoSemanaAtiva.certificado_liberado
      )
      .subscribe({
        next: () =>
          this.toastService.success('Configuração salva com sucesso!'),
        error: () => this.toastService.error('Erro ao salvar configuração!'),
        complete: () => (this.salvandoConfiguracoes = false),
      });
  }

  carregarAssinaturas() {
    this.carregarAssinaturaPresidente();
    this.carregarAssinaturaDirecao();
  }

  carregarAssinaturaPresidente() {
    this.presidenteEdicao = {
      nome: this.edicaoSemanaAtiva.presidente_edicao,
      assinatura: this.edicaoSemanaAtiva.assinatura_presidente_edicao,
      tipo: 'presidente',
      editando: false,
    };
  }

  carregarAssinaturaDirecao() {
    this.direcaoInstituto = {
      nome: this.edicaoSemanaAtiva.direcao_instituto,
      assinatura: this.edicaoSemanaAtiva.assinatura_direcao_instituto,
      tipo: 'direcao',
      editando: false,
    };
  }

  carregarCamisaEdicao() {
    this.camisaEdicao = {
      editando: false,
      foto_camisa: this.edicaoSemanaAtiva.foto_camisa,
      valor: this.edicaoSemanaAtiva.valor_camisa,
      salvando: false,
    };
  }

  carregarQuemSomos() {
    this.quemSomos = this.edicaoSemanaAtiva.quem_somos;
    this.editandoQuemSomos = false;
  }

  carregarComoChegar() {
    this.comoChegar = this.edicaoSemanaAtiva.como_chegar;
    this.editandoComoChegar = false;
  }

  carregarFaleConosco() {
    this.faleConosco = this.edicaoSemanaAtiva.fale_conosco;
    this.editandoFaleConosco = false;
  }

  carregarTextoPagamento() {
    this.textoPagamento = this.edicaoSemanaAtiva.texto_pagamento;
    this.editandoTextoPagamento = false;
  }

  salvarAssinatura(assinatura: Assinatura) {
    if (assinatura.tipo === 'presidente') {
      this.salvandoAssinaturaPresidente = true;
    } else {
      this.salvandoAssinaturaDirecao = true;
    }
    this.edicaoService
      .salvarAssinatura(assinatura, this.edicaoSemanaAtiva.id)
      .subscribe({
        next: (_) => {
          assinatura.editando = false;
          if (assinatura.tipo === 'presidente') {
            this.edicaoSemanaAtiva.assinatura_presidente_edicao =
              this.presidenteEdicao.assinatura;
            this.edicaoSemanaAtiva.presidente_edicao =
              this.presidenteEdicao.nome;
          } else {
            this.edicaoSemanaAtiva.assinatura_direcao_instituto =
              this.direcaoInstituto.assinatura;
            this.edicaoSemanaAtiva.direcao_instituto =
              this.direcaoInstituto.nome;
          }
          this.toastService.success('Assinatura salva com sucesso!');
        },
        error: (_) => {
          this.toastService.error('Erro ao salvar assinatura!');
        },
        complete: () => {
          if (assinatura.tipo === 'presidente') {
            this.salvandoAssinaturaPresidente = false;
          } else {
            this.salvandoAssinaturaDirecao = false;
          }
        },
      });
  }

  cancelarAssinaturaEdicao(assinatura: Assinatura) {
    if (assinatura.tipo === 'presidente') {
      this.salvandoAssinaturaPresidente = true;
    } else {
      this.salvandoAssinaturaDirecao = true;
    }
  }

  aceitarInscricoesAtividades() {
    this.salvandoConfiguracoes = true;
    this.edicaoService
      .aceitarInscricoesAtividades(
        this.edicaoSemanaAtiva.id,
        this.edicaoSemanaAtiva.aceita_inscricao_atividade
      )
      .subscribe({
        next: (_) => {
          this.toastService.success('Configuração salva com sucesso!');
        },
        error: (_) => {
          this.toastService.error('Erro ao salvar configuração!');
        },
        complete: () => {
          this.salvandoConfiguracoes = false;
        },
      });
  }

  salvarLogo(modal: NgbModalRef, tipo_logo: string) {
    modal.componentInstance.saving = true;
    this.edicaoService
      .salvarLogo(
        this.edicaoSemanaAtiva.id,
        modal.componentInstance.croppedImage,
        tipo_logo
      )
      .subscribe({
        next: (_) => {
          if (tipo_logo === 'logo') {
            this.edicaoSemanaAtiva.logo = modal.componentInstance.croppedImage;
          } else {
            this.edicaoSemanaAtiva.logo_completa =
              modal.componentInstance.croppedImage;
          }
          modal.dismiss();
        },
        complete: () => {
          modal.componentInstance.saving = false;
        },
      });
  }

  salvarCamisa() {
    if (!this.camisaEdicao.foto_camisa || !this.camisaEdicao.valor) {
      return;
    }
    this.camisaEdicao.salvando = true;
    this.edicaoService
      .salvarCamisa(
        this.edicaoSemanaAtiva.id,
        this.camisaEdicao.foto_camisa,
        this.camisaEdicao.valor
      )
      .subscribe({
        next: (_) => {
          this.edicaoSemanaAtiva.foto_camisa = this.camisaEdicao.foto_camisa;
          this.edicaoSemanaAtiva.valor_camisa = this.camisaEdicao.valor;
          this.toastService.success('Camisa salva com sucesso!');
          this.camisaEdicao.editando = false;
        },
        error: (_) => {
          this.toastService.success('Erro ao salvar informações da camisa!');
        },
        complete: () => {
          this.camisaEdicao.salvando = false;
        },
      });
  }

  alterarLogo() {
    const modal = this.modalService.open(ImageUploadComponent);
    const componentInstance = <ImageUploadComponent>modal.componentInstance;
    componentInstance.setTamanhos(360, 480);
    componentInstance.salvarAction = this.salvarLogo.bind(this, modal, 'logo');
    componentInstance.cancelar = () => {
      modal.dismiss();
    };
  }

  alterarLogoCompleta() {
    const modal = this.modalService.open(ImageUploadComponent);
    const componentInstance = <ImageUploadComponent>modal.componentInstance;
    componentInstance.setTamanhos(460, 248);
    componentInstance.salvarAction = this.salvarLogo.bind(
      this,
      modal,
      'logo_completa'
    );
    componentInstance.cancelar = () => {
      modal.dismiss();
    };
  }

  alterarCamisa() {
    const modal = this.modalService.open(ImageUploadComponent);
    const componentInstance = <ImageUploadComponent>modal.componentInstance;
    componentInstance.setTamanhos(450, 583);
    componentInstance.salvarAction = () => {
      this.camisaEdicao.foto_camisa = componentInstance.croppedImage;
      modal.dismiss();
    };
    componentInstance.cancelar = () => {
      modal.dismiss();
    };
  }

  alterarAssinatura(assinatura: Assinatura) {
    const modal = this.modalService.open(ImageUploadComponent);
    const componentInstance = <ImageUploadComponent>modal.componentInstance;
    componentInstance.setTamanhos(1000, 240);
    componentInstance.salvarAction = () => {
      if (assinatura.tipo === 'presidente') {
        this.presidenteEdicao.assinatura = componentInstance.croppedImage;
      } else {
        this.direcaoInstituto.assinatura = componentInstance.croppedImage;
      }
      modal.dismiss();
    };
    componentInstance.cancelar = () => {
      modal.dismiss();
    };
  }

  ativarSiteEmConstrucao() {
    this.salvandoConfiguracoes = true;
    this.edicaoService
      .siteEmConstrucao(
        this.edicaoSemanaAtiva.id,
        this.edicaoSemanaAtiva.site_em_construcao
      )
      .subscribe({
        next: (_) => {
          this.toastService.success('Configuração salva com sucesso!');
        },
        error: (_) => {
          this.toastService.error('Erro ao salvar configuração!');
        },
        complete: () => {
          this.salvandoConfiguracoes = false;
        },
      });
  }

  salvarQuemSomos() {
    this.carregandoQuemSomos = true;
    this.edicaoService
      .salvarQuemSomos(this.quemSomos!, this.edicaoSemanaAtiva.id)
      .subscribe({
        next: (_) => {
          this.toastService.success('Configuração salva com sucesso!');
          this.editandoQuemSomos = false;
          this.edicaoSemanaAtiva.quem_somos = this.quemSomos;
        },
        error: (_) => {
          this.toastService.error('Erro ao salvar configuração!');
        },
        complete: () => {
          this.carregandoQuemSomos = false;
        },
      });
  }

  salvarComoChegar() {
    this.carregandoComoChegar = true;
    this.edicaoService
      .salvarComoChegar(this.comoChegar!, this.edicaoSemanaAtiva.id)
      .subscribe({
        next: (_) => {
          this.toastService.success('Configuração salva com sucesso!');
          this.editandoComoChegar = false;
          this.edicaoSemanaAtiva.como_chegar = this.comoChegar;
        },
        error: (_) => {
          this.toastService.error('Erro ao salvar configuração!');
        },
        complete: () => {
          this.carregandoComoChegar = false;
        },
      });
  }

  salvarFaleConosco() {
    this.carregandoFaleConosco = true;
    this.edicaoService
      .salvarFaleConosco(this.faleConosco!, this.edicaoSemanaAtiva.id)
      .subscribe({
        next: (_) => {
          this.toastService.success('Configuração salva com sucesso!');
          this.editandoFaleConosco = false;
          this.edicaoSemanaAtiva.fale_conosco = this.faleConosco;
        },
        error: (_) => {
          this.toastService.error('Erro ao salvar configuração!');
        },
        complete: () => {
          this.carregandoFaleConosco = false;
        },
      });
  }

  salvarTextoPagamento() {
    this.carregandoTextoPagamento = true;
    this.edicaoService
      .salvarTextoPagamento(this.textoPagamento!, this.edicaoSemanaAtiva.id)
      .subscribe({
        next: (_) => {
          this.toastService.success('Configuração salva com sucesso!');
          this.editandoTextoPagamento = false;
          this.edicaoSemanaAtiva.texto_pagamento = this.textoPagamento;
        },
        error: (_) => {
          this.toastService.error('Erro ao salvar configuração!');
        },
        complete: () => {
          this.carregandoTextoPagamento = false;
        },
      });
  }
}
