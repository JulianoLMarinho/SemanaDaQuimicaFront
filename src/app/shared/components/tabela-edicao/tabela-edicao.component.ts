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
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';
import { StyleService } from '../../../services/style.service';
import { BaseModel } from '../../models/baseModel';
import { TableUtil } from '../../utils/table-utils';
import { ModalAdicionarEditarComponent } from '../modal-adicionar-editar/modal-adicionar-editar.component';
import {
  CustomActions,
  ModalFieldConfiguration,
} from '../modal-adicionar-editar/modal-field-configuration';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';
import { TabelaHeaders } from './tabela-headers';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tabela-edicao',
  templateUrl: './tabela-edicao.component.html',
  styleUrls: ['./tabela-edicao.component.scss'],
})
export class TabelaEdicaoComponent<T> implements OnInit, OnChanges {
  @Input() headers: TabelaHeaders[] = [];
  @Input() data: T[] = [];
  @Input() loading = false;
  @Input() readOnly = false;
  @Input() noActions = false;
  @Input() enableDownload = false;
  @Input() modalConfig: (entidadeEdit?: any) => ModalFieldConfiguration[] =
    () => [];
  @Input() salvarAction: (entity: any) => Observable<boolean> = ({}) =>
    of(false);
  @Input() deletarAction?: (entity: any) => Observable<boolean>;
  @Input() showDeletarAction?: (entity: any) => boolean;
  @Input() nomeEntidade = '';
  @Input() customActions: CustomActions[] = [];
  @Input() deletarConfirmacaoTexto: string = 'Deseja deletar este item?';

  @Output() saved = new EventEmitter();
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private modalService: NgbModal,
    public corEdicao: CoresEdicaoService,
    private toast: ToastrService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.dataSource.data = this.data;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    !this.noActions && this.displayedColumns.push('acoes');
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
    activeModal.componentInstance.readOnly = this.readOnly;
    activeModal.componentInstance.saved.subscribe(() => {
      this.saved.emit();
    });
  }

  deleteAction(entidade: any) {
    const modal = this.modalService.open(ModalConfirmacaoComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });

    modal.componentInstance.titulo = 'Confirmar deleção';
    modal.componentInstance.mensagem = this.deletarConfirmacaoTexto;

    modal.componentInstance.salvar = () => {
      this.deletarAction &&
        this.deletarAction(entidade).subscribe({
          next: (res: boolean) => {
            if (res) {
              this.toast.success('Operação realizada com sucesso.');
              this.saved.emit();
              modal.dismiss();
            }
          },
          error: (err: HttpErrorResponse) => {
            modal.componentInstance.loading = false;
            this.toast.error(err?.error?.detail || 'Houve algum erro.');
          },
        });
    };
  }

  callCustomAction(action: any, args: any) {
    console.log(action);
    action(args);
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  download() {
    TableUtil.exportArrayToExcel(this.data, 'export');
  }
}
