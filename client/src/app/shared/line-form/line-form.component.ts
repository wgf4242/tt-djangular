import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-line-form',
  templateUrl: 'line-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LineFormComponent),
      multi: true
    }
  ],
})
export class LineFormComponent implements ControlValueAccessor, OnInit {
  @Input() items = [{ id: '1', name: 'a' }, { id: '2', name: 'b' }];
  _value;

  private propagateChange = (_: any) => { };
  get outValue() {
    return this._value;
  }

  set outValue(value) {
    this._value = value;
    this.propagateChange(this._value);
  }

  writeValue(obj: any): void {
    if (obj) {
      this._value = obj;
    }
  }

  registerOnChange(fn: any): void { this.propagateChange = fn; }

  registerOnTouched(fn: any): void { }

  ngOnInit() { }

  onChange(ev: MatSelectChange) {
    this.propagateChange(ev.value);
  }
}
