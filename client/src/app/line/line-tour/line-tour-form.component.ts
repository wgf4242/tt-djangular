import { Component, OnInit } from '@angular/core';
import { LineService } from 'app/_services/line.service';
import { Tour} from 'app/_models/line-tour';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import {Line} from "../../_models/line";

enum Status { Edit, Add, Delete };

@Component({
  templateUrl: './line-tour-form.component.html',
})

export class LineTourFormComponent implements OnInit {
  tour: Tour = new Tour();
  lines: Line[];
  routeid: number;
  status: Status;
  Ishide: true;

  constructor(
    private lineService: LineService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.routeid = params['id'];
    });

    if (this.routeid) {
      this.status = Status.Edit;
      console.log(this.routeid);
      this.lineService.getTour(this.routeid).subscribe(tour => this.tour = tour);
    } else {
      this.status = Status.Add;
      console.log('not defined');
    }

    this.lineService.getLines().subscribe(lines => this.lines = lines);
  }

  delete() {
    this.status = Status.Delete;
  }

  onSubmit(form: NgForm) {
    if (this.status === Status.Edit) {
      this.lineService.putTour(this.routeid, form.value).subscribe(tour => {
        this.tour = tour; this.router.navigate(['line/tour'])
      });
    } else if (this.status === Status.Delete) {
      this.lineService.deleteTour(this.routeid).subscribe(ok => {
        console.log(ok); this.router.navigate(['line/tour']);
      })
    } else { this.lineService.addTour(form.value).subscribe(tour => { this.tour = tour; this.router.navigate(['line/tour']) }); }
    // this.router.navigate(['line/tour']);
  }

}
