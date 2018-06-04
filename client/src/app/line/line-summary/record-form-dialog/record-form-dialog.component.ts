import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-record-form-dialog',
  templateUrl: './record-form-dialog.component.html',
  styles: []
})
export class RecordFormDialogComponent{
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RecordFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      count: ['', Validators.required],
      unit: ['', Validators.required],
    })
  }

  onSubmit({value, valid}, ev: Event) {
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

  onSelectionChange(ev: any) {
    if (!ev.isUserInput) {
      return;
    }
    const v = ev.source.value;
    const unit = this.data.suggestions.filter(i => i.label === v)[0].unit
    this.form.get('unit').setValue(unit);
    console.log(ev);
  }
}
