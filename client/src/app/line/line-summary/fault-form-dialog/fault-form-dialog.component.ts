import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatAutocomplete } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { startWith, tap, debounceTime, map } from 'rxjs/operators';

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
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;

  form: FormGroup;
  type = FaultType;
  filteredStates: any;

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
    this.filteredStates = this.form.get('line').valueChanges
    .pipe(
      startWith(''),
      tap(v => console.log(v)),
      debounceTime(300),
      map(state => state ? this.filterStates(state) : this.data.lines.slice())
    );
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    if (moment.isMoment(value.date)) {
      value.date = (<moment.Moment>value.date).format().substring(0, 19);
    } else {
      value.date = moment(value.date).format().substring(0, 19);
    }
    this.dialogRef.close(value);
  }

  orgValueChange(value) {
  }

  filterStates(label: string) {
    return this.data.lines.filter(data =>
      data.indexOf(label) > -1);
  }

  chooseFirstOption(ev: Event): void {
    ev.preventDefault();
    this.matAutocomplete.options.first.select();
  }

}
