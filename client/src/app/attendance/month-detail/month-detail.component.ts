import {Component, OnInit} from '@angular/core';
import {MonthService} from 'app/_services/month.service';
import {AttendService} from 'app/_services/attend.service';
import {PersonService} from 'app/_services/person.service';
import {Person} from 'app/_models/person';
import {Month} from 'app/_models/month';
import {Attend} from 'app/_models/attend';
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './month-detail.component.html'
})
export class MonthDetailComponent implements OnInit {

  persons: Person[];
  month: Month;
  attends: Attend[];
  p: number;

  constructor(private attendService: AttendService,
              private personService: PersonService,
              private monthService: MonthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const monthId = this.route.snapshot.params['month'];
    // const monthId = this.route.snapshot.params['id'];
    console.log(this.route.params);
    this.route.params.subscribe(value =>
      this.attendService.getAttendsByParams(value).subscribe(attends => this.attends =attends )
    );
    if (monthId) {this.monthService.getMonth(monthId).subscribe(month => this.month = month);}
    // if (monthId) {
    //   this.monthService.getMonth(monthId).subscribe(month => this.month = month);
    //   this.attendService.getAttends(monthId).subscribe(attends => (this.attends = attends, console.log(attends)))
    // } else {
    //
    //   this.monthService.getMonths().subscribe(months => {
    //     this.month = months.results[0];
    //     this.attendService.getAttends(this.month.id).subscribe(attends => (this.attends = attends, console.log(attends)))
    //   });
    // }
    this.personService.getPersons().subscribe(persons => this.persons = persons);
  }


  filterPerson(personId: number) {
    const lname = this.persons && this.persons.filter(line => line.id === personId)[0].name;
    return lname;
  }

  delete(id: number) {
    this.attendService.deleteAttend(id).subscribe(value => {
      this.attends = this.attends.filter(obj => obj.id !== id)
    })
  }

}
