import {Component, OnInit} from '@angular/core';
import {LineService} from 'app/_services/line.service';
import {Branch} from 'app/_models/line';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {FacilityCategory, Line} from '../../_models/line';

@Component({
  templateUrl: './line-facility-form.component.html',
})
export class LineFacilityFormComponent implements OnInit {
  lines: Line[];
  branches: Branch[];
  selectedLine: any;
  categories: FacilityCategory[];

  constructor(private lineService: LineService, private router: Router) {
  }

  ngOnInit() {
    this.lineService.getLines().subscribe(lines => this.lines = lines);
    this.lineService.getBranches().subscribe(branches => this.branches = branches);
    this.lineService.getFacilitiesCategories().subscribe(category => this.categories = category);
  }

  onSubmit(form: NgForm) {
    this.lineService.addFacility(form.value).subscribe(
      facility => console.log(facility),
      error2 => {},
      () => this.router.navigate(['line/facility'])
    )
  }

  onChange($event) {
    const value = $event.target.value;
    console.log(value);
    this.getTheBranch(value);
  }

  getTheBranch(lineid: number) {
    const branchIdArray = this.lines && this.lines.filter(line => line.id === lineid)[0].branch;
    const branchArray = this.branches.filter(branch => branchIdArray.includes(branch.id))
    // console.log(branchArray);
    return branchArray;
  }
}
