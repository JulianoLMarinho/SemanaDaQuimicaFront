import { Injectable } from '@angular/core';
import { ModalFieldConfiguration } from '../../../../shared/components/modal-adicionar-editar/modal-field-configuration';

@Injectable({
  providedIn: 'root',
})
export class BaseTabelaService {
  mostrarTabela = false;
  modelo: ModalFieldConfiguration[] = [];
  constructor() {}
}
