import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { OpcaoSelect } from '../../models/atividades';

export interface ModalFieldConfiguration {
  fieldName: string;
  fieldInitialValue: any;
  fieldProperty: string;
  fieldType: FIELD_TYPE;
  fieldPlaceholder?: string;
  fieldErrorMessage: string;
  fieldValidators: ValidatorFn[];
  fieldOptions?: OpcaoSelect[];
  fieldOptionsFiltered?: OpcaoSelect[];
  fieldPlaceholderFilter?: string;
  fieldOptionChange?: Function;
  fieldShowOnTable?: boolean;
  tableStyle?: any;
  fieldVisible?: (args: any) => boolean;
  fieldDisplayFormatter?: (args: any) => string;
  fieldLoadOptionsService?: () => Observable<OpcaoSelect[]>;
}

export type FIELD_TYPE =
  | 'text'
  | 'textArea'
  | 'select'
  | 'selectFilter'
  | 'multiselect'
  | 'dayHour'
  | 'number'
  | 'picture'
  | 'date'
  | 'image';

export interface FieldOptions {
  name: string;
  value: string;
}
