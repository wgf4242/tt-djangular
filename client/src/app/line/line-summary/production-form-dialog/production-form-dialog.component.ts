import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith, tap, debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './production-form-dialog.component.html',
})
export class ProductionFormDialogComponent {
  form: FormGroup;
  filteredStates: Observable<any[]>;
  constructor(
    public dialogRef: MatDialogRef<ProductionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      production_date: ['', Validators.required],
      line: ['', Validators.required],
      branch: ['', Validators.required],
      position: ['', Validators.required],
      transformer: ['', ],
      single_disconnector: ['', ],
      breaker: ['', ],
      disconnector: ['', ],
      grounding_device: ['', ],
      arrester: ['', ],
      pole: ['', ],
      length: ['', ],
      well: ['', ],
      comment: ['', ],
    })
  }

  onSubmit({ value, valid }, ev: Event) {
    if (!valid) {
      return;
    }
    value = this.checkForm(value);
    this.dialogRef.close(value);
  }

  checkForm(dict: any) {
    for (const key in dict) {
      if (dict.hasOwnProperty(key)) {
        const v = dict[key];
        dict[key] = !!v ? v : 0;
      }
    }
    console.log(dict);
    dict.disconnector = dict.transformer + dict.single_disconnector + dict.breaker * 2;
    dict.grounding_device = dict.transformer + dict.single_disconnector + dict.breaker;
    dict.arrester = (dict.transformer + dict.single_disconnector + dict.breaker) * 3;
    return dict;
  }

  onSelectionChange(ev: any) {
    if (!ev.isUserInput) {
      return;
    }
    const nameValue = ev.source.value;
    const unit = this.data.suggestions.filter(i => i.label === nameValue)[0].unit
    this.form.get('unit').setValue(unit);
    console.log(ev);
  }
}
