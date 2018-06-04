import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export enum FaultType {
  Trip,
  Earth
}

@Component({
  selector: 'app-fault-form-dialog',
  templateUrl: './fault-form-dialog.component.html',
  styles: []
})
export class FaultFormDialogComponent implements OnInit {
  form: FormGroup;
  type = FaultType;

  constructor(
    public dialogRef: MatDialogRef<FaultFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    let trip_init1 = '速断';
    let trip_init2 = '成功';
    let trip_init_weather = '晴';
    if (data.type !== this.type.Trip) {
      trip_init1 = '';
      trip_init2 = '';
      trip_init_weather = '';
    }

    this.form = this.fb.group({
      line: ['', Validators.required],
      date: ['', ],
      action: [trip_init1],
      reconnect: [trip_init2],
      reason: [''],
      downtime: [''],
      recover_time: [''],
      phenomenon: [''],
      weather: [trip_init_weather],
      comment: [''],
    })
  }

  ngOnInit() {
  }

  onLineChange() {

  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }
}
