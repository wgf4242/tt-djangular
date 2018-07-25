import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-attend-dialog',
  templateUrl: './attend-dialog.component.html',
  styles: []
})
export class AttendDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AttendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id: [],
      attend: [],
      workhour: [],
      climbhour: [],
      comment: [],
    })
    if (data.object) {
      this.form.setValue({ id: this.data.object['id'], attend: this.data.object['attend'], workhour: this.data.object['workhour'], climbhour: this.data.object['climbhour'], comment: this.data.object['comment'], })
    }
  }

  ngOnInit() {
    console.log('this.data is ', this.data);
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log('form value is ', value);
    this.dialogRef.close(value);
  }
}
