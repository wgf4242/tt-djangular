import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-tour-form',
  templateUrl: 'tour-form-dialog.component.html',
  styles: []
})
export class TourFormDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TourFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date().setHours(0, 0, 0, 0);
    const secondDate = new Date(2018, 6 - 1, 11); // 5 is monthIndex, index start from  0
    const diffDays = Math.round(Math.abs((firstDate - secondDate.getTime()) / (oneDay)))
    const m = diffDays % 14 > 7 ? '1' : '2';
    console.log(diffDays, m);

    this.form = this.fb.group({
      type: ['1', Validators.required],
      line: ['', Validators.required],
      length: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9\.]+/)])],
      person: [m, Validators.required],
      date: [new Date(), Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit({ value, valid }, ev: Event) {
    if (!valid) {
      return;
    }
    value.date = (<moment.Moment>value.date).format().substring(0, 19);
    this.dialogRef.close(value);
  }

  onLineChange(): void {

  }

  // TODO: calculate 1 , 2 class
}
