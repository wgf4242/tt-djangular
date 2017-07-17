import { Component, OnInit } from '@angular/core';
import { MonthPage } from 'app/_models/month';
import { MonthService } from 'app/_services/month.service';

@Component({
  selector: 'app-month-list',
  templateUrl: './month-list.component.html',
})
export class MonthListComponent implements OnInit {
  months: MonthPage;

  constructor (private monthService: MonthService) {}

  ngOnInit() {
    this.monthService.getMonths().subscribe(months => this.months = months);
  }

}
