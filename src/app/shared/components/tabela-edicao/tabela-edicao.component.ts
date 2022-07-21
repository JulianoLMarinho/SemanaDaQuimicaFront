import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { StyleService } from '../../../services/style.service';
import { BaseModel } from '../../models/baseModel';
import { ModalAdicionarEditarComponent } from '../modal-adicionar-editar/modal-adicionar-editar.component';
import { ModalFieldConfiguration } from '../modal-adicionar-editar/modal-field-configuration';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';
import { TabelaHeaders } from './tabela-headers';

@Component({
  selector: 'app-tabela-edicao',
  templateUrl: './tabela-edicao.component.html',
  styleUrls: ['./tabela-edicao.component.scss'],
})
export class TabelaEdicaoComponent<T> implements OnInit, OnChanges {
  @Input() headers: TabelaHeaders[] = [];
  @Input() data: T[] = [];
  @Input() loading = false;
  @Input() modalConfig: (entidadeEdit?: any) => ModalFieldConfiguration[] =
    () => [];
  @Input() salvarAction: (entity: any) => Observable<boolean> = ({}) =>
    of(false);
  @Input() deletarAction: (entity: any) => Observable<boolean> = ({}) =>
    of(false);
  @Input() nomeEntidade = '';

  @Output() saved = new EventEmitter();
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modalService: NgbModal,
    public corEdicao: CoresEdicaoService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.dataSource.data = this.data;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    if (this.modalConfig().length > 0) {
      this.headers = this.modalConfig().map(
        (x) =>
          <TabelaHeaders>{
            name: x.fieldName,
            property: x.fieldProperty,
            valueFormatter: x.fieldDisplayFormatter,
            show: x.fieldShowOnTable ?? true,
            tableStyle: x.tableStyle,
          }
      );
    }

    this.displayedColumns = this.headers
      .filter((x) => x.show)
      .map((x) => x.property);
    this.displayedColumns.push('acoes');
    this.dataSource.data = this.data;
  }

  loadData() {}

  openAddEditModal(entidadeEdit?: BaseModel) {
    const activeModal = this.modalService.open(ModalAdicionarEditarComponent, {
      centered: true,
      ariaDescribedBy: 'modal-basic-title',
    });

    activeModal.componentInstance.modalFields = this.modalConfig(entidadeEdit);
    activeModal.componentInstance.salvarAction = this.salvarAction.bind(this);
    activeModal.componentInstance.saved.subscribe(() => {
      this.saved.emit();
    });
  }

  deleteAction(entidade: any) {
    const modal = this.modalService.open(ModalConfirmacaoComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });

    modal.componentInstance.titulo = 'Confirmar deleção';
    modal.componentInstance.mensagem = 'Deseja deletar este item?';

    modal.componentInstance.salvar = () => {
      this.deletarAction(entidade).subscribe((res) => {
        if (res) {
          this.saved.emit();
          modal.dismiss();
        }
      });
    };
  }
}
