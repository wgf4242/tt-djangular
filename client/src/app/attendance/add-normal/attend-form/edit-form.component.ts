import {Component, OnInit} from '@angular/core';
import {AttendService} from '../../../_services/attend.service';
import {ActivatedRoute} from '@angular/router';
import {AttendDetail} from '../../../_models/attend';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';


@Component({
  templateUrl: 'edit-form.component.html'
})
export class EditFormComponent implements OnInit {
  attend: AttendDetail;
  attendId: number;

  constructor(private attendService: AttendService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.attendId = this.route.snapshot.params['id'];
    this.attendService.getAttend(this.attendId).subscribe(attend => (this.attend = attend, console.log(attend)));
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      Object.keys(form.value).forEach(key =>
        this.attend[key] = form.value[key]
      )
      this.attendService.updateAttend(this.attend).subscribe(value => {
        console.log(value);
        this.location.back();
      })
    }
  }

}
