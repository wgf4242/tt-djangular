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
    let trip_action = '速断';
    let trip_reconnect = '成功';
    let trip_weather = '晴';
    if (data.type !== this.type.Trip) {
      trip_action = '';
      trip_reconnect = '';
      trip_weather = '';
    }

    this.form = this.fb.group({
      line: ['', Validators.required],
      date: ['', ],
      action: [trip_action],
      reconnect: [trip_reconnect],
      reason: [''],
      downtime: [''],
      recover_time: [''],
      phenomenon: [''],
      weather: [trip_weather],
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
