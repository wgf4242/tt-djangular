import {Component, OnInit} from '@angular/core';
import {LineService} from '../../_services/line.service';
import {ProductionRecord} from "../../_models/line";

@Component({
  selector: 'app-line-info-list',
  templateUrl: './line-production-list.component.html',
  styleUrls: ['./line-production-list.component.css']
})
export class LineProductionListComponent implements OnInit {
  productionRecords: ProductionRecord[];

  constructor(private lineService: LineService) {
  }

  ngOnInit() {
    this.lineService.getProductionRecords().subscribe(value => {
      this.productionRecords = value;
    })
  }

}
