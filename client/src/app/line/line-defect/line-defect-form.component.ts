import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Branch } from 'app/_models/line';
import { CatSuggest, LineService } from 'app/_services/line.service';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Defect, DefectsCategory, DefectsType, Line } from '../../_models/line';

enum Status { Edit, Add, Delete };

@Component({
  selector: 'app-line-defect-form',
  templateUrl: './line-defect-form.component.html',
})
export class LineDefectFormComponent implements OnInit {
  categorie_suggestions: CatSuggest[];
  cat_suggest: String[];
  object: Defect = new Defect();
  lines: Observable<Line[]>;
  lineBranches: Observable<Branch[]>;
  allBranches: Observable<Branch[]>;
  form: FormGroup;

  Status = Status;
  status: Status;
  defectId: number;

  finish_date: string;
  categories: DefectsCategory[];
  types: DefectsType;

  submitted_list: Defect[] = [];
  datePickerConfig = { 'format': 'YYYY-MM-DD', 'firstDayOfWeek': 'mo', 'locale': 'zh-cn' };

  constructor(private lineService: LineService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.lineService.getCatSuggest().subscribe(v => this.categorie_suggestions = v);
    this.lineService.getCategories().subscribe(v => {
      console.log(v);
      this.categories = v;
    });
    this.allBranches = this.lineService.getBranches();
    this.lineService.getDefectType().subscribe(types => {
      this.types = types;
      if (!this.object.type) { this.object.type = types[0].id }
    });

    this.route.params.subscribe((params: Params) => {
      this.defectId = params['id'];
      // Edit form
      if (this.defectId) {
        this.status = Status.Edit;
        this.getDefectAndFill();
      } else {
        // Add form
        this.status = Status.Add;
        this.object.date = format(new Date(), 'YYYY-MM-DD');
        this.object.line = 1;
        this.object.category = 1;
        this.lines = this.lineService.getLines();
        console.log(format(new Date(), 'YYYY-MM-DD'));
      }
    });
  }

  private createForm() {
    this.form = this.fb.group({
      type: ['1', [Validators.required]],
      line: ['1', [Validators.required]],
      branch: ['1', [Validators.required]],
      position: ['', [Validators.required, Validators.min(1), Validators.max(400)]],
      category: ['1', [Validators.required]],
      description: ['', [Validators.required]],
      comment: '',
      date: ['', [Validators.required]],
      finish_date: '',
      person: ['', [Validators.required]],
    });
  }

  private getDefectAndFill() {
    return null;
  }

  onSubmit() {
    // add Defect
    if (this.status === Status.Add) {
      this.lineService.addDefect(this.object).subscribe(object => {
        this.object = <Defect>object;
        this.router.navigate(['line/defect']);
      })
    } else {
      // update object
      this.lineService.updateDefect(this.object).subscribe(object => {
        this.object = <Defect>object;
        this.router.navigate(['line/defect']);
      })
    }
  }
  onDuplicate() {
    // only work in Add mode
    this.lineService.addDefect(this.object).subscribe(object => {
      this.object = object;
      this.submitted_list.push(object);
      console.log(this.submitted_list);
    });
  }

  onChange($event) {
    const lineId = $event.target.value;
    console.log('This is line change,', lineId);
    // this.getCurrentBranches(value);
    this.lineBranches = this.getCurrentBranches(lineId);
  }

  getCurrentBranches(lineid: string) {
    const id = Number(lineid);
    return this.lines.pipe(
      switchMap(lines => lines.filter(e => e.id === id)),
      map(lines => lines.branch),
      switchMap(currentBranches => {
        return this.allBranches.pipe(
          map(branches => branches.filter(branch => currentBranches.indexOf(branch.id) >= 0))
        );
      })
    );
  }

  onChangeCat($event) {
    const name = this.categories.find(cat => String(cat.id) === String(this.object.category)).name;
    this.cat_suggest = this.categorie_suggestions.find(c => c.name === name).select;
  }

  addDescription($event) {
    if (this.object.description) {
      this.object.description += $event.target.innerHTML + ',';
    } else {
      this.object.description = $event.target.innerHTML + ',';
    }
  }

}
