import { Component, OnInit } from '@angular/core';
import { Month } from "app/attendance/month";
import { MonthService } from "app/attendance/month.service";

@Component({
  selector: 'app-month-list',
  templateUrl: './month-list.component.html',
  // styleUrls: ['./attendance.component.css'],
  providers: [MonthService]
})
export class MonthListComponent implements OnInit {
  errorMessage: string;
  months: Month[];
  mode = 'Observable';
 
  constructor (private monthService: MonthService) {}
 
  ngOnInit() { this.getMonths(); }
 
  getMonths() {
    this.monthService.getMonths()
                     .subscribe(
                       months => this.months = months,
                       error =>  this.errorMessage = <any>error);
  }
 
  // addMonth(name: string) {
  //   if (!name) { return; }
  //   this.monthService.create(name)
  //                    .subscribe(
  //                      month  => this.months.push(month),
  //                      error =>  this.errorMessage = <any>error);
  // }
}
