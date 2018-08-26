import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-line-defect-dialog',
  templateUrl: './line-defect-dialog.component.html',
  styles: []
})
export class LineDefectDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LineDefectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      line: ['', Validators.required],
      date: ['',],
      action: [],
      reconnect: [],
      reason: [''],
      downtime: [''],
      recover_time: [''],
      phenomenon: [''],
      weather: [],
      comment: [''],
    })
  }

  ngOnInit() {
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }

  }
}
