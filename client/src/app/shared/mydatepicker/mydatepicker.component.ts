import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-mydatepicker',
  templateUrl: 'mydatepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MydatepickerComponent),
      multi: true
    },
  ],
})
export class MydatepickerComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = '选择日期';
  private propagateChange = (_: any) => { };

  writeValue(obj: any): void {
    if (obj) {
      // content
      console.log(obj);
    }
  }

  registerOnChange(fn: any): void { this.propagateChange = fn; }

  registerOnTouched(fn: any): void { }

  ngOnInit() { }


  outValue(v: string) {
    console.log(v);
    this.propagateChange(v.replace(/\//g, '-'));
  }
}
