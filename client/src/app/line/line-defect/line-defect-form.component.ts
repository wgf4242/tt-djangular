import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CatSuggest, LineService } from 'app/_services/line.service';
import { Branch } from 'app/_models/line';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Defect, DefectsCategory, DefectsType, Line } from '../../_models/line';
import { format } from 'date-fns';

enum Status { Edit, Add, Delete };

@Component({
  selector: 'app-line-defect-form',
  templateUrl: './line-defect-form.component.html',
})
export class LineDefectFormComponent implements OnInit {
  categorie_suggestions = [
    { 'name': '刀闸', 'select': ['刀闸片烧', '机构开焊'] },
    { 'name': '鸟窝', 'select': ['有鸟窝'] },
    { 'name': '杆塔', 'select': ['横线路歪', '顺线路歪', '严重'] },
    { 'name': '导线', 'select': ['有断股'] },
    { 'name': '拉线', 'select': ['废拉线', '拉线松动'] },
    { 'name': '绝缘子', 'select': ['中相', '边相', '螺丝松', '缺开口销'] },
    { 'name': '防雷与接地装置', 'select': ['无接地极', '缺接地线'] },
    { 'name': '横担金具及变台', 'select': ['有铜铝线夹'] },
    { 'name': '配电变压器', 'select': [] },
    { 'name': '柱上开关', 'select': [] },
    { 'name': '线路防护', 'select': [] }
  ]

  object: Defect = new Defect();
  lines: Line[];
  lineBranches: Branch[];
  allBranches: Branch[];
  form: FormGroup;

  Status = Status;
  status: Status;
  defectId: number;

  finish_date: string;
  categories: DefectsCategory[];
  cat_suggest: CatSuggest;
  types: DefectsType;

  submited_list: Defect[] = [];
  datePickerConfig = { 'format': 'YYYY-MM-DD', 'firstDayOfWeek': 'mo', 'locale': 'zh-cn' };

  constructor(private lineService: LineService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {

    this.lineService.getBranches().subscribe(branches => this.allBranches = branches);
    this.lineService.getCategories().subscribe(categories => this.categories = categories);
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
        this.lineService.getLines().subscribe(lines => { this.lines = lines; this.getTheBranch(1) });
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
    this.lineService.getDefect(this.defectId).subscribe(object => {
      this.object = object;
      // this.lineBranches = this.getTheBranch(object.line);
      // TODO this is bad
      this.lineService.getLines().subscribe(lines => {
        this.lines = lines;
        this.getTheBranch(object.line);
      });
    });
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
      this.submited_list.push(object);
      console.log(this.submited_list);
    });
  }

  onChange($event) {
    const value = $event.target.value;
    console.log('This is line change,', value);
    this.getTheBranch(value);
  }

  getTheBranch(lineid: number) {
    const branchIdArray = this.lines && this.lines.filter(line => line.id === lineid)[0].branch;
    const branchArray = this.allBranches.filter(branch => branchIdArray.includes(branch.id))
    // console.log(branchArray);
    this.lineBranches = branchArray;
  }

  onChangeCat($event) {
    const name = this.categories.find(cat => cat.id === this.object.category).name;
    this.cat_suggest = this.categorie_suggestions.find(c => c.name === name);
  }

  addDescription($event) {
    if (this.object.description) {
      this.object.description += $event.target.innerHTML + ',';
    } else {
      this.object.description = $event.target.innerHTML + ',';
    }
  }

}
