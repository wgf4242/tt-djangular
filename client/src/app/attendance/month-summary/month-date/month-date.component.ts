import { Component, OnInit, Input } from '@angular/core';
import { Month } from 'app/_models/month';
import { AttendService } from 'app/_services/attend.service';
import { Attend } from 'app/_models/attend';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-month-date',
  templateUrl: './month-date.component.html',
})
export class MonthDateComponent implements OnInit {
  @Input() month: Month;
  attends: Attend[];
  constructor(private attendService: AttendService) {}

  ngOnInit() {
    this.attendService.getAttends(this.month.id).subscribe(attends => {
      this.attends = attends;
    });
  }
}
