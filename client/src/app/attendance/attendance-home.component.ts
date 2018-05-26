import { Component, OnInit } from '@angular/core';
import { Person } from '../_models/person';
import { MonthService } from 'app/_services/month.service';
import { PersonService } from 'app/_services/person.service';
import { Router } from '@angular/router';
import { Month } from 'app/_models/month';

@Component({
  selector: 'attendance-home',
  templateUrl: './attendance-home.component.html',
})
export class AttandenceHomeComponent implements OnInit {
  errorMessage: string;
  persons: Person[] = [];
  month: Month;
  lastMonthId: number;
  bAttend = false;

  constructor(
    private personService: PersonService,
    private monthService: MonthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPersons();
    this.getLastMonth();
  }

  getPersons() {
    this.personService.getPersons().
      subscribe(
      persons => this.persons = persons,
      error => this.errorMessage = <any>error);
  }

  getLastMonth() {
    this.monthService.getMonths()
      .subscribe(
      months => {
        this.month = months.results[0];
        this.lastMonthId = this.month.id;
      },
      error => this.errorMessage = <any>error);
  }

  c1() {
    this.router.navigate(['attendance']);
    // this.bAttend = true;
    // // this.bAttend = !this.bAttend;
    console.log(this.bAttend);
  }
}
