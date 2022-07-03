import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CoresEdicaoService } from 'src/app/services/coresEdicao.service';
import { EdicaoSemanaService } from 'src/app/services/edicaoSemana.service';
import { ImageUploadComponent } from 'src/app/shared/components/image-upload/image-upload.component';
import { EdicaoSemana } from 'src/app/shared/models/edicao-semana';
import { GerenciarSiteComponent } from '../gerenciar-site/gerenciar-site.component';

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

  @ViewChild(GerenciarSiteComponent)
  gerenciarSiteComponent!: GerenciarSiteComponent;

  constructor(
    private edicaoService: EdicaoSemanaService,
    public coresEdicao: CoresEdicaoService,
    public toastService: ToastrService,
    private modalService: NgbModal
  ) {
    this.edicaoSemanaAtiva = this.edicaoService.semanaAtiva;
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
    this.edicaoService
      .salvarLogo(
        this.edicaoSemanaAtiva.id,
        modal.componentInstance.croppedImage,
        tipo_logo
      )
      .subscribe((_) => {
        if (tipo_logo === 'logo') {
          this.edicaoSemanaAtiva.logo = modal.componentInstance.croppedImage;
        } else {
          this.edicaoSemanaAtiva.logo_completa =
            modal.componentInstance.croppedImage;
        }
        modal.dismiss();
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
}
