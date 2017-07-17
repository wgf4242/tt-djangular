import {Component, OnInit} from '@angular/core';
import {LineService} from '../../_services/line.service';
import {Tour} from '../../_models/line-tour';
import {HttpParams} from '@angular/common/http';
import {Line, ProductionRecord} from '../../_models/line';

@Component({
  selector: 'app-line-summary',
  templateUrl: './line-summary.component.html',
  styleUrls: ['./line-summary.component.css']
})
export class LineSummaryComponent implements OnInit {
  private tours: Tour[];
  lines: Line[];
  lines_sum: number;
  tours_sum: number;
  production_records: ProductionRecord[];

  constructor(private lineServie: LineService) {
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
    this.lineServie.getTours(params).subscribe(tours => {
      this.tours = tours;
      this.tours_sum = parseFloat(this.tours.reduce((sum, tour) => sum + tour.length, 0).toFixed(2));
    });

    // get lines and sum array length
    this.lineServie.getLines().subscribe(lines => {
      this.lines = lines;
      this.lines_sum = parseFloat(this.lines.reduce((len_sum, line) => len_sum + line.length, 0).toFixed(2));
    })

    // get ProductionRecords
    this.lineServie.getProductionRecords(params).subscribe(production_records => (this.production_records = production_records, console.log(this.production_records)));
  }

}
