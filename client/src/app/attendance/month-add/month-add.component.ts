import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MonthService } from '../../_services/month.service';

@Component({
  selector: 'app-month-add',
  templateUrl: './month-add.component.html',
})
export class MonthAddComponent implements OnInit {
  errorMessage: any;

  constructor(private monthService: MonthService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.monthService.addMonth(form.value).subscribe(
        month => (console.log(month), this.router.navigate(['attendance/add']))
      );
    }
  }
}
