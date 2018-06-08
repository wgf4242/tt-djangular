import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageAttendSumObj } from 'app/_models/attend';
import { Month } from 'app/_models/month';
import { AttendService } from 'app/_services/attend.service';
import { MonthService } from 'app/_services/month.service';
import { Observable } from 'rxjs';
import { Person } from '../../_models/person';
import { PersonService } from '../../_services/person.service';

@Component({
  templateUrl: './month-summary.component.html'
})
export class MonthSummaryComponent implements OnInit {
  month: Month;
  page: PageAttendSumObj;
  isEdit = false;
  isSubmit = false;
  params = {};
  perseon$: Observable<Person[]>;
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private monthService: MonthService,
    private attendService: AttendService,
    private personService: PersonService,
    // private attenceHome: AttandenceHomeComponent
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.monthService.getMonth(this.id).subscribe(month => (this.month = month, console.log(month)));
        this.attendService.getAttendsSum(this.id).subscribe(page => this.page = page);
        this.perseon$ = this.personService.getPersons();
      }
    );
    console.log(this.id);
  }

  mySubmit() {
    this.monthService.updateMonth(this.month).subscribe(obj => {
      this.isEdit = false;
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false
      }, 1000)
    });
  }

  archive() {
    this.month.archived = 1;
    this.monthService.updateMonth(this.month).subscribe(value => {
      this.router.navigate(['attendance']);
    })
  }

}
