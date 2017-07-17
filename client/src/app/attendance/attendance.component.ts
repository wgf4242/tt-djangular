import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';
import { Person } from './person';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers: [PersonService]
})
export class AttandenceComponent implements OnInit {
	persons: Person[] = [];
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.getPersons().then(persons => this.persons = persons);
  	}

}
