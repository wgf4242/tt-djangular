import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Line } from '../../_models/line';
import { Transformer } from '../../_models/line-transformers';
import { LineService } from '../../_services/line.service';

@Component({
  selector: 'app-line-transformer',
  templateUrl: './line-transformer.component.html',
  styleUrls: ['./line-transformer.component.css']
})
export class LineTransformerComponent implements OnInit, OnChanges {
  form: FormGroup;
  lines: Observable<Line[]>;
  list = [];
  @Input() errorMessage: string;
  @Input() item: Transformer;
  @Output() onClick = new EventEmitter();

  constructor(private fb: FormBuilder, private lineService: LineService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [],
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item) {
      // Object.keys(this.item).forEach(key => {
      // this.form.patchValue({this.item})
      // })
      this.form.patchValue(this.item);
      console.log(this.form.value);
    } else if (this.form) {
      this.form.reset();
      this.form.patchValue({ line: 1, is_weld: false });
    }
  }

  onSubmit({ value, valid }, ev: Event) {
    // console.log(value);
    if (valid) {
      // this.lineService.addTransformer(value).subscribe(value2 => {console.log(value2);this.list.push(`已添加井号： ${value2.well}`);this.errorMessage = null;},err => {console.log(err);this.errorMessage = err;});
      this.onClick.emit(value);
    }

  }



}
