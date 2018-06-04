import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TourFormDialogComponent } from 'app/line/line-summary/tour-form-dialog/tour-form-dialog.component';
import { filter } from 'rxjs/operators';
import { Line, ProductionRecord } from '../../_models/line';
import { Tour } from '../../_models/line-tour';
import { PageObject } from '../../_models/shared';
import { LineService } from '../../_services/line.service';
import { FaultFormDialogComponent, FaultType } from './fault-form-dialog/fault-form-dialog.component';
import { RecordFormDialogComponent } from './record-form-dialog/record-form-dialog.component';



@Component({
  selector: 'app-line-summary',
  templateUrl: './line-summary.component.html',
  styleUrls: ['./line-summary.component.css']
})
export class LineSummaryComponent implements OnInit {
  suggestions = [
    { label: '更换跌落保险', unit: '个' },
    { label: '更换变压器', unit: '台' },
    { label: '拆除鸟窝', unit: '处' },
    { label: '更换避雷器', unit: '支' },
    { label: '装设驱鸟器', unit: '个' },
    { label: '正立瓶', unit: '个' },
    { label: '更换设备线夹', unit: '个' },
    { label: '修补接地极', unit: '处' },
    { label: '调整弛度', unit: '相' },
    { label: '更换刀闸', unit: '片' },
    { label: '变压器补油', unit: '台' },
    { label: '更换绝缘子', unit: '支' },
  ]

  private tours: Tour[];
  lines: Line[];
  lines_sum: number;
  tours_sum: number;
  tours_fault_sum: number;
  production_records: PageObject<ProductionRecord[]>;
  page: number;
  type = FaultType;

  arr_tour = [];
  arr_temp = [];
  arr_trip = [];
  arr_earth = [];

  constructor(private lineService: LineService,
    private dialog: MatDialog
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
    this.lineService.getProductionRecords(params).subscribe(production_records => (this.production_records = production_records, console.log(this.production_records)));
  }


  openTourFormDialog() {
    const dialogRef = this.dialog.open(TourFormDialogComponent, {
      width: '250px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().pipe(filter(n => n))
      .subscribe((result: Tour) => {
        console.log('The dialog was closed', result);
        this.lineService.addTour(result).subscribe(_ => this.arr_tour.push('添加成功'));
      });
  }

  openFaultFormDialog(type: FaultType) {
    const dialogRef = this.dialog.open(FaultFormDialogComponent, {
      width: '250px',
      data: { type: type }
    });

    dialogRef.afterClosed().pipe(filter(n => n))
      .subscribe(result => {
        console.log(result);
        this.lineService.addLineFault(result).subscribe(
          _ => {
            if (type === this.type.Earth) {
              this.arr_earth.push('添加成功')
            } else {
              this.arr_trip.push('添加成功')
            }
          },
          err => {}
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
        this.lineService.addRecord(result).subscribe();
      });
  }


}
