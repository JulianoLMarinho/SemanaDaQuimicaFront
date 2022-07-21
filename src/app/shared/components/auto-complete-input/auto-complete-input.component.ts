import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, UntypedFormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete-input',
  templateUrl: './auto-complete-input.component.html',
  styleUrls: ['./auto-complete-input.component.scss']
})
export class AutoCompleteInputComponent implements OnInit, OnChanges {

  @Input() options: any[] = [];
  
  @Input()
  valueField!: string;

  @Input()
  textField!: string;

  @Input()
  labelText!: string;

  @Input()
  selectedValue!: string;

  @Input()
  loading = false;

  @Input()
  disabled = false;

  @Output()
  selectedOption: EventEmitter<any> = new EventEmitter<any>()

  filteredOptions: Observable<any[]> | undefined;

  inputControl = new UntypedFormControl('', [Validators.required, this.requireMatch.bind(this)]);
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.inputControl.setValue(this.selectedValue)
    }
    if (changes.disabled) {
      changes.disabled.currentValue ? this.inputControl.disable() : this.inputControl.enable();
    }
    if (changes.selectedValue) {
      this.inputControl.setValue(changes.selectedValue.currentValue)
    }
  }

  ngOnInit() {
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value)),
      map(name => (typeof name === 'string' ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(option: string): string {
    const sel = this.options.find(x => x[this.valueField] === option);
    if (sel) return option && (sel[this.textField]);
    else return ''
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option[this.textField].toLowerCase().includes(filterValue));
  }

  selectOption(option: MatAutocompleteSelectedEvent) {
    this.selectedOption.emit(option.option.value)
    this.selectedValue = option.option.value;
  }

  requireMatch(control: AbstractControl){
    const vSel = this.options.findIndex(x => x[this.valueField] === control.value)
    const tSel = this.options.findIndex(x => x[this.textField] === control.value)
    if (vSel < 0 && tSel < 0) {
      return { incorrect: true };
    }
    return null;
  }

  selectNewOption(event: any) {
    const g = this.options.findIndex(x => x.nome === event.target.value)
    if (g < 0) {
      this.selectedOption.emit(null)
    } else {
      this.selectedOption.emit(event.target.value)
    }
  }
}
