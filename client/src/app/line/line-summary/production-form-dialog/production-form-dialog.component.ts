import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

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
      // production_date: '2018-6-17',
      production_date: [new Date(), Validators.required],
      // production_date: ['', Validators.required],
      line: [null, Validators.required],
      branch: [null, Validators.required],
      position: [null, Validators.required],
      transformer: [null, ],
      single_disconnector: [null, ],
      breaker: [null, ],
      disconnector: [null, ],
      grounding_device: [null, ],
      arrester: [null, ],
      pole: [null, ],
      length: [null, ],
      well: [null, ],
      comment: [null, ],
    })
  }

  onSubmit({ value, valid }, ev: Event) {
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
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
