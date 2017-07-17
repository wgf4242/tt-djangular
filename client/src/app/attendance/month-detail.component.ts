import { Component, OnInit, Input } from '@angular/core';
import { Month, MonthObj } from "app/attendance/month";
import { MonthService } from "app/attendance/month.service";

import { ActivatedRoute, Params } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { AttendService } from "app/attendance/attend.service";
import { AttendSum, PageObj } from "app/attendance/attend";

@Component({
  selector: 'app-month-list',
  templateUrl: './month-detail.component.html',
  // styleUrls: ['./attendance.component.css'],
  providers: [MonthService, AttendService]
})
export class MonthDetailComponent implements OnInit {

  @Input() month: MonthObj;
  page: PageObj[];

  constructor(
    private route: ActivatedRoute,
    private monthService: MonthService,
    private attendService: AttendService
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.monthService.getMonth(+params['id']))
      .subscribe(month => this.month = month);
    
    this.route.params
      .switchMap((params: Params) => this.attendService.getAttendsSum(+params['id']))
      .subscribe(page => this.page = page);
    
  }

}
