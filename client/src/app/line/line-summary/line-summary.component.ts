import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TourFormDialogComponent } from 'app/line/line-summary/tour-form-dialog/tour-form-dialog.component';
import { Observable, from } from 'rxjs';
import { distinctUntilChanged, filter, map, tap, mergeMap, mergeAll } from 'rxjs/operators';
import { Fault, Line, ProductionRecord } from '../../_models/line';
import { Tour } from '../../_models/line-tour';
import { PageObject } from '../../_models/shared';
import { LineService } from '../../_services/line.service';
import { FaultFormDialogComponent, FaultType } from './fault-form-dialog/fault-form-dialog.component';
import { RecordFormDialogComponent } from './record-form-dialog/record-form-dialog.component';
import { ProductionFormDialogComponent } from './production-form-dialog/production-form-dialog.component';

@Component({
  selector: 'app-line-summary',
  templateUrl: './line-summary.component.html',
  styleUrls: ['./line-summary.component.css']
})
export class LineSummaryComponent implements OnInit {
  suggestions = [];

  private tours: Tour[];
  lines: Line[];
  lines_sum: number;
  tours_sum: number;
  tours_fault_sum: number;
  production_records: PageObject<ProductionRecord[]>;

  page: number;
  type = FaultType;

  temp_work: string;
  arr_tour = [];
  arr_temp = [];
  arr_trip = [];
  arr_earth = [];

  constructor(private lineService: LineService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    const date = new Date();
    const start_date = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().substring(0, 10);
    const end_date = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);
    // filter current month param
    const params = new HttpParams({
      fromObject: {
        start_date: start_date,
        end_date: end_date,
      }
    });

    // get tours and sum array length
    this.lineService.getTours(params).subscribe((tours: Tour[]) => {
      // this.tours = tours.filter(v => v.type === 1);
      this.tours_fault_sum = parseFloat(tours.filter(v => v.type === 1).reduce((sum, tour) => sum + tour.length, 0).toFixed(2));
      // this.tours_fault_sum = parseFloat(this.tours.reduce((sum, tour) => sum + tour.length, 0).toFixed(2));
      this.tours_sum = parseFloat(tours.filter(v => v.type === 2).reduce((sum, tour) => sum + tour.length, 0).toFixed(2));
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
      tap(val => console.log(val)),
      tap(arr => {
        this.arr_earth = arr.filter(v => !!v.phenomenon);
        this.arr_trip = arr.filter(v => !v.phenomenon);
      }),
      tap(val => console.log(val)),
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
      data: { type: type }
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
      data: { suggestions: this.suggestions }
    });

    dialogRef.afterClosed().pipe(filter(n => n))
      .subscribe(result => {
        console.log('The dialog was closed', result);
        // this.lineService.addRecord(result).subscribe(_ => { }, _ => { }, success => this.openSnackBar());
      });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarTipComponent, {
      duration: 500,
    });
  }
}


@Component({
  template: `
    <span class="example-pizza-party">
      {{text}}
    </span>
    `,
  styles: [`.example-pizza-party { color: hotpink; }`],
})
export class SnackBarTipComponent {
  @Input() text = '添加成功';
}
