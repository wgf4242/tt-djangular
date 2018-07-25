import { SnackBarTipComponent } from './snack-bar-tip.component';

import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TourFormDialogComponent } from 'app/line/line-summary/tour-form-dialog/tour-form-dialog.component';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { Line } from '../../_models/line';
import { Tour } from '../../_models/line-tour';
import { ProductionRecord } from '../../_models/production';
import { PageObject } from '../../_models/shared';
import { LineService } from '../../_services/line.service';
import { FaultFormDialogComponent, FaultType } from './fault-form-dialog/fault-form-dialog.component';
import { ProductionFormDialogComponent } from './production-form-dialog/production-form-dialog.component';
import { RecordFormDialogComponent } from './record-form-dialog/record-form-dialog.component';

@Component({
  selector: 'app-line-summary',
  templateUrl: './line-summary.component.html',
  styleUrls: ['./line-summary.component.css'],

})
export class LineSummaryComponent implements OnInit {
  form: FormGroup;

  suggestions = [];

  private tours: Tour[];
  lines: Line[];
  lines_sum: number;

  tours_sum: number;
  tours_count: number;
  tours_fault_sum: number;
  tours_fault_count: number;

  production_records: PageObject<ProductionRecord[]>;

  page: number;
  type = FaultType;

  temp_work: string;
  arr_tour = [];
  arr_temp = [];
  arr_trip = [];
  arr_earth = [];

  constructor(
    private fb: FormBuilder,
    private lineService: LineService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      line: ['1']
    });
    this.updateDateValueField('start_date');
    this.updateDateValueField('end_date');
  }

  private updateDateValueField(fStartDate: string) {
    this.form.controls[fStartDate].valueChanges.subscribe(v => {
      if (typeof v === 'string') {
        return v;
      }
      console.log(v);
      const date = v.format('YYYY-MM-DD');
      this.form.get(fStartDate).setValue(date);
    });
  }

  ngOnInit() {
    const date = new Date();
    if (!this.form.valid) {
      const start_date = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().substring(0, 10);
      const end_date = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);
      this.form.get('start_date').setValue(start_date);
      this.form.get('end_date').setValue(end_date);
    }// filter current month param
    const params = new HttpParams({
      fromObject: this.form.value
    });

    // get tours and sum array length
    this.lineService.getTours(params).subscribe((tours: Tour[]) => {
      // this.tours = tours.filter(v => v.type === 1);
      this.tours_fault_sum = parseFloat(tours.filter(v => v.type === 1).reduce((sum, tour) => sum + tour.length, 0).toFixed(2));
      this.tours_fault_count = Array.from(new Set(tours.filter(v => v.type === 1).map(e => e.line))).length;
      // this.tours_fault_sum = parseFloat(this.tours.reduce((sum, tour) => sum + tour.length, 0).toFixed(2));
      this.tours_sum = parseFloat(tours.filter(v => v.type === 2).reduce((sum, tour) => sum + tour.length, 0).toFixed(2));
      this.tours_count = Array.from(new Set(tours.filter(v => v.type === 2).map(e => e.line))).length;
    });

    // get lines and sum array length
    this.lineService.getLines().subscribe(lines => {
      this.lines = lines;
      this.lines_sum = parseFloat(this.lines.reduce((len_sum, line) => len_sum + line.length, 0).toFixed(2));
    })

    // get ProductionRecords
    this.lineService.getProductionRecords(params).subscribe(
      production_records => {
        this.production_records = production_records;
        // console.log(this.production_records)
      });

    this.lineService.getRecords(params).pipe(
      tap(v => this.temp_work = v.map(i => `${i.name}${i.sum}${i.unit}`).join(',')),
      tap(v => this.suggestions = v.map(i => { return { label: i.name, unit: i.unit } })),
      distinctUntilChanged()
    ).subscribe();

    this.lineService.getLineFaults(params).pipe(
      tap(arr => {
        this.arr_earth = arr.filter(v => !!v.phenomenon);
        this.arr_trip = arr.filter(v => !v.phenomenon);
      }),
    ).subscribe();
  }


  openTourFormDialog() {
    const dialogRef = this.dialog.open(TourFormDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().pipe(filter(n => n))
      .subscribe((result: Tour) => {
        console.log('The dialog was closed', result);
        this.lineService.addTour(result).subscribe(_ => this.arr_tour.push('添加成功'),
          err => { },
          () => { this.openSnackBar() }
        );
      },
    );
  }

  openFaultFormDialog(type: FaultType) {
    const dialogRef = this.dialog.open(FaultFormDialogComponent, {
      width: '250px',
      data: { type: type, lines: this.lines.map(e => e.name) }
    });

    dialogRef.afterClosed().pipe(filter(n => n))
      .subscribe(result => {
        console.log('openFaultFormDialog', result);
        this.lineService.addLineFault(result).subscribe(
          _ => {
            if (type === this.type.Earth) {
              this.arr_earth.push('添加成功')
            } else {
              this.arr_trip.push('添加成功')
            }
          },
          err => { },
          () => { this.openSnackBar() }
          // TODO: not done;
        )
      });
  }

  openRecordFormDialog() {
    const dialogRef = this.dialog.open(RecordFormDialogComponent, {
      width: '250px',
      data: { suggestions: this.suggestions }
    });

    dialogRef.afterClosed().pipe(filter(n => n))
      .subscribe(result => {
        console.log('The dialog was closed');
        this.lineService.addRecord(result).subscribe(_ => { }, _ => { }, success => this.openSnackBar());
      });
  }
  openProductionFormDialog() {
    const dialogRef = this.dialog.open(ProductionFormDialogComponent, {
      width: '250px',
      data: { lines: this.lines }
    });

    dialogRef.afterClosed().pipe(
      filter(n => n),
      tap(v => console.log(v)),
      switchMap(result => this.lineService.addProductionRecord(result)),
      switchMap(productRecord => this.lineService.getUpdateFieldsByProduction(productRecord))
    ).subscribe(
      _ => this.openSnackBar(),
      err => { this.openSnackBar('添加失败') },
    );
  }

  openSnackBar(data: string = '添加成功') {
    this.snackBar.openFromComponent(SnackBarTipComponent, {
      duration: 500,
      data: data
    });
  }

  reload() {
    this.ngOnInit();
  }

  test() {
    console.log(this.form.controls['line']);
  }
}


