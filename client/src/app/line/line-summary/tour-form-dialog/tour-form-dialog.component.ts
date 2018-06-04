import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tour-form',
  templateUrl: 'tour-form-dialog.component.html',
  styles: []
})
export class TourFormDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TourFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any,
    private  fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      type: ['1', Validators.required],
      line: ['', Validators.required],
      length: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9\.]+/)])],
      person: ['1', Validators.required],
      date: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit({value, valid}, ev: Event) {
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

  onLineChange(): void {

  }

  // TODO: calculate 1 , 2 class
}
