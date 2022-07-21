import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Patrocinador } from '../../shared/models/patrocinador';
import { AuthenticationService } from '../../services/authentication.service';
import { ContentService } from '../../services/content.service';
import { CoresEdicaoService } from '../../services/coresEdicao.service';
import { EdicaoSemanaService } from '../../services/edicaoSemana.service';
import { PatrocinadorService } from '../../services/patrocinador.service';
import { EditAttributeComponent } from '../../shared/components/edit-attribute/edit-attribute.component';
import { ModalConfirmacaoComponent } from '../../shared/components/modal-confirmacao/modal-confirmacao.component';
import { EditButtonDirective } from '../../shared/models/edit-button-directive';
import { AppUtils } from '../../shared/utils';
import { StorageService } from '../../services/storage.service';
import { EdicaoSemana } from 'src/app/shared/models/edicao-semana';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  images: any[] = [];
  patrocinadores: Patrocinador[] = [];
  tema: string;
  images2: any[] = [];
  showEdit = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  addEditCarousel: any = {
    edicao_semana_id: null,
    id: null,
    imagem: '',
    titulo: '',
    subtitulo: '',
    ordem: 0,
    link: null,
  };
  carregandoPatrocinador = false;

  editDirective: EditButtonDirective = {
    editAction: this.alterarTema.bind(this),
    showEditButton: true,
  };
  edicaoSemana: EdicaoSemana;

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    public authService: AuthenticationService,
    private edicaoSemanaService: EdicaoSemanaService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private patrocinadorService: PatrocinadorService,
    public coresEdicao: CoresEdicaoService,
    private storage: StorageService
  ) {
    this.tema = '';
    this.edicaoSemana = this.edicaoSemanaService.semanaAtiva;
  }

  ngOnInit() {
    this.loadDetalhesEdicao();
  }

  loadImages() {
    this.contentService.getImages().subscribe((res) => {
      res.map((x) => {
        x.encodedImage = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/png;base64,' + x.imagem
        );
        return x;
      });
      this.images2 = res;
    });
  }

  mouseOver() {
    this.showEdit = this.authService.userIsAdmin();
  }

  alterarTema() {
    let modal = this.modalService.open(EditAttributeComponent, {
      centered: true,
    });

    modal.componentInstance.atributo = this.tema;

    modal.result.then((result) => {
      this.atualizarTemaEdicao(result);
    });
  }

  loadDetalhesEdicao() {
    this.edicaoSemanaService.getDetalhes().subscribe(async (res) => {
      this.tema = res.tema;
      await this.carregarCarousel(res.id);
      this.carregarPatrocinadores(res.id);
    });
  }

  atualizarTemaEdicao(tema: string) {
    this.edicaoSemanaService.updateTemaEdicaoAtiva({ tema: tema }).subscribe(
      (_) => {
        this.toastr.success('Tema atualizado com sucesso');
        this.tema = tema;
      },
      (error) => {
        this.toastr.error('Houve algum erro!');
      }
    );
  }

  salvarSlideImage(modalRef: NgbActiveModal) {
    this.addEditCarousel.edicao_semana_id =
      this.edicaoSemanaService.semanaAtiva.id;

    if (this.addEditCarousel.id) {
      this.edicaoSemanaService
        .editarCarrousselImage(this.addEditCarousel)
        .subscribe(
          (_) => {
            this.toastr.success('Imagem salva com sucesso');
            this.carregarCarousel(this.edicaoSemanaService.semanaAtiva.id);
            modalRef.close();
          },
          (err) => {
            this.toastr.error('Houve algum erro!');
          }
        );
    } else {
      this.edicaoSemanaService
        .salvarCarrousselImage(this.addEditCarousel)
        .subscribe(
          (_) => {
            this.toastr.success('Imagem salva com sucesso');
            this.carregarCarousel(this.edicaoSemanaService.semanaAtiva.id);
            modalRef.close();
          },
          (err) => {
            this.toastr.error('Houve algum erro!');
          }
        );
    }
  }

  openModal(image: any, content: any) {
    console.log(image);
    this.croppedImage = image.imagem;
    this.addEditCarousel.id = image.id;
    this.addEditCarousel.imagem = image.imagem;
    this.addEditCarousel.titulo = image.titulo;
    this.addEditCarousel.subtitulo = image.subtitulo;
    this.addEditCarousel.link = image.link;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // groupControl.value = result;
        },
        (reason) => {
          console.log(reason);
        }
      );
  }

  async carregarCarousel(edicaoId: number) {
    this.edicaoSemanaService.getCarouselEdicao(edicaoId).subscribe((car) => {
      this.images = car;
      this.images.map((x) => {
        x['imageSanitized'] = AppUtils.imageSanitizer(x.imagem, this.sanitizer);
      });
      if (this.authService.userIsAdmin()) this.images.push({ add: true });
    });
  }

  deletarCarouselImage(carouselImageId: number) {
    const carouselImageModal = this.modalService.open(
      ModalConfirmacaoComponent,
      { ariaLabelledBy: 'modal-basic-title' }
    );

    carouselImageModal.componentInstance.titulo = 'Confirmar deleção';
    carouselImageModal.componentInstance.mensagem =
      'Deseja deletar esta imagem?';

    carouselImageModal.componentInstance.salvar = () => {
      this.edicaoSemanaService.deletarCarouselImage(carouselImageId).subscribe(
        (_) => {
          this.toastr.success('Imagem deletada com sucesso');
          this.carregarCarousel(this.edicaoSemanaService.semanaAtiva.id);
          carouselImageModal.close();
        },
        (err) => {
          this.toastr.error('Houve algum erro!');
        }
      );
    };
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.addEditCarousel.imagem = event.base64;
  }

  carregarPatrocinadores(edicaoId?: number) {
    this.carregandoPatrocinador = true;
    this.patrocinadorService
      .obterPatrocinadoresEdicao(
        edicaoId || this.edicaoSemanaService.semanaAtiva.id
      )
      .subscribe((patrocinadores) => {
        this.patrocinadores = patrocinadores;
        this.patrocinadores.map((x) => {
          x.sanitizedImagem = AppUtils.imageSanitizer(x.imagem, this.sanitizer);
        });

        if (this.authService.userIsAdmin()) {
          this.patrocinadores.push({
            add: true,
            imagem: '',
            nome: '',
            edicao_semana_id: 0,
            id: 0,
            link: '',
            ordem: 0,
          });
        }
        this.carregandoPatrocinador = false;
      });
  }

  abrirLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
}
