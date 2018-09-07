import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDatepicker
} from '@angular/material';
import { LineService, CatSuggest } from 'app/_services/line.service';
import { Line, Branch, DefectsCategory, DefectsType, Defect } from 'app/_models/line';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { filterLineBranches } from 'app/utils/string.utils';

@Component({
  selector: 'app-line-defect-dialog',
  templateUrl: './line-defect-dialog.component.html',
  styles: []
})
export class LineDefectDialogComponent implements OnInit {
  categorie_suggestions: CatSuggest[];
  cat_suggest: String[];
  defect: Defect;
  form: FormGroup;
  lines: Line[];
  allbranches: Branch[];
  branches: Branch[];
  categories: DefectsCategory[];
  types: DefectsType[];


  constructor(
    public dialogRef: MatDialogRef<LineDefectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private lineService: LineService
  ) {
    this.form = this.fb.group({
      id: [],
      type: [],
      line: ['', Validators.required],
      branch: ['', Validators.required],
      category: ['', Validators.required],
      position: ['', Validators.compose([Validators.required, Validators.max(300)])],
      description: ['', Validators.required],
      comment: [],
      date: ['', Validators.required],
      finish_date: [],
      person: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log(this.data);
    this.lineService.getCatSuggest().subscribe(v => this.categorie_suggestions = v);
    this.lineService.getLines().pipe(
      switchMap(lines => {
        this.lines = lines;
        return this.lineService.getBranches();
      }),
      switchMap(branches => {
        this.allbranches = this.branches = branches;
        return this.lineService.getCategories()
      }),
      switchMap(categories => {
        this.categories = categories;
        return this.lineService.getDefectType()
      }),
      switchMap(types => {
        this.types = types;
        if (this.data.id) {
          return this.lineService.getDefect(this.data.id)
        }
        return of(0); // 创建对象
      }),
      map((res: any) => {
        if (res !== 0) {
          this.defect = res;
        }
      })
    ).subscribe(_ => this.init_form());
  }

  init_form() {
    if (this.defect) {
      const obj = JSON.parse(JSON.stringify(this.defect))
      this.form.setValue(obj);
    }

  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

  onDuplicate() {}

  filter(line: string) {
    const branches = this.lines.filter(l => l.id === line)[0].branch;
    this.branches = this.allbranches.filter(v => branches.indexOf(v.id) > -1)
  }

  onChangeCat($event) {
    const select_id = $event.value;
    const name = this.categories.find(cat => String(cat.id) === String(select_id));
    this.cat_suggest = this.categorie_suggestions.find(c => c.name === name.name).select;
  }

  addDescription(str: String) {
    if (this.form.controls['description']) {
      this.form.controls['description'].setValue(this.form.controls['description'].value + str + ',');
    } else {
      this.form.controls['description'].setValue(str + ',');
    }
  }

}
