import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LineService} from "../../_services/line.service";
import {Line} from "../../_models/line";
import {Observable} from "rxjs/Observable";
import {NewTransformerDialogComponent} from "../../new-transformer-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-line-transformer',
  templateUrl: './line-transformer.component.html',
  styleUrls: ['./line-transformer.component.css']
})
export class LineTransformerComponent implements OnInit {
  form: FormGroup;
  lines: Observable<Line[]>;
  list = [];
  errorMessage: string;

  constructor(private fb: FormBuilder, private lineService: LineService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      line: [1, Validators.required],
      // line: [1, [Validators.required, Validators.pattern("[0-9]{3,4}-[0-9]{1,2}-[0-9]{1,2}")]],
      well: [],
      category: [],
      capacity: [],
      voltage: [],
      date: [],
      no: [],
      manufacturers: [],
      is_weld: [false, Validators.required],
      comment: [],
    });
    this.lines = this.lineService.getLines();

  }

  onSubmit({value, valid}, ev: Event) {
    console.log(value);
    if (valid) {
      this.lineService.addTransformer(value).subscribe(value2 => {
          console.log(value2);
          this.list.push(`已添加井号： ${value2.well}`);
          this.errorMessage = null;
      },err => {
        console.log(err);
        this.errorMessage = err;
      });
    }
  }
}
