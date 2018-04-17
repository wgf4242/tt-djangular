import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-line-repair',
  templateUrl: './line-repair.component.html',
  styleUrls: ['./line-repair.component.css']
})
export class LineRepairComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
