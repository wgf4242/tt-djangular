import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith, tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-record-form-dialog',
  templateUrl: './record-form-dialog.component.html',
  styles: []
})
export class RecordFormDialogComponent {
  form: FormGroup;
  filteredStates: Observable<any[]>;
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
    this.filteredStates = this.form.get('name').valueChanges
      .pipe(
        startWith(''),
        tap(v => console.log(v)),
        debounceTime(300),
        map(state => state ? this.filterStates(state) : this.data.suggestions.slice())
      );
  }

  filterStates(label: string) {
    return this.data.suggestions.filter(data =>
      data.label.toLowerCase().indexOf(label.toLowerCase()) > -1);
      // data.label.toLowerCase().indexOf(label.toLowerCase()) === 0);
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

  nameChange(ev: any) {
    return null;
  }
}
