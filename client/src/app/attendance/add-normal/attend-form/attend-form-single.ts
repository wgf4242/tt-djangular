import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  // moduleId: module.id,
  selector: 'app-attend-form',
  templateUrl: 'attend-form-single.html'
})
export class AttendSingleFormComponent implements OnInit {
  @Input() addressForm: FormGroup;
  @Input() person: Object;
  @Input() index: number;

  ngOnInit() {

  }
}
