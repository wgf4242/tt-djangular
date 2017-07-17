import {Component, OnInit} from '@angular/core';
import {Line, ProductionRecord} from "../../_models/line";
import {LineService} from "../../_services/line.service";
import {Branch} from "../../_models/line";

@Component({
  selector: 'app-line-info-detail',
  templateUrl: './line-production-form.component.html',
})
export class LineProductionFormComponent implements OnInit {
  item: ProductionRecord;
  lines: Line[];
  branches: Branch[];

  constructor(private lineService: LineService) {
    this.item = new ProductionRecord();
  }

  ngOnInit() {
    this.lineService.getLines().subscribe(lines => this.lines = lines);
    this.lineService.getBranches().subscribe(branches => this.branches = branches);
  }

  onSubmit() {
    this.lineService.addProductionRecord(this.item).subscribe(value => {
      console.log('submit success', value);
    });
  }

  onChange($event) {
    const value = $event.target.value;
    console.log(value);
    this.getTheBranch(value);
  }

  getTheBranch(lineid: number) {
    const branchIdArray = this.lines && this.lines.filter(line => line.id == lineid)[0].branch;
    const branchArray = this.branches.filter(branch => branchIdArray.includes(branch.id))
    // console.log(branchArray);
    return branchArray;
  }
}
