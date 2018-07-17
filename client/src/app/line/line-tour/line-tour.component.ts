import { Component, OnInit } from '@angular/core';
import { LineService } from "app/_services/line.service";
import { Tour} from "app/_models/line-tour";
import { Person } from "app/_models/person";
import { PersonService } from "app/_services/person.service";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import {Line} from "../../_models/line";

@Component({
  selector: 'app-line-tour',
  templateUrl: './line-tour.component.html',
  styleUrls: ['./line-tour.component.css'],
})
export class LineTourComponent implements OnInit {
  tours: Tour[];
  errorMessage: any;
  persons: Person[];
  lines: Line[];

  constructor(
    private lineService: LineService,
    private personService: PersonService,
  ) { }

  ngOnInit() {
    // Method 1
    // this.lines = new Array<Line>();
    // this.persons = new Array<Person>();
    this.lineService.getLines().subscribe(lines => this.lines = lines);
    this.lineService.getTours().subscribe(tours => { this.tours = tours });
  }


  filterName(lineId: number) {
    const lname = this.lines && this.lines.filter(line => line.id === lineId)[0].name;
    // Method 2
    // const lname = this.lines ? this.lines.filter(line => line.id === lineID)[0].name : '加载中'
    return lname;
  }

}
