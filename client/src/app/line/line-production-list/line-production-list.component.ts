import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Facility } from '../../_models/line';
import { ProductionRecord } from '../../_models/production';
import { PageObject } from '../../_models/shared';
import { LineService } from '../../_services/line.service';

@Component({
  selector: 'app-line-info-list',
  templateUrl: './line-production-list.component.html',
  styleUrls: ['./line-production-list.component.css']
})
export class LineProductionListComponent implements OnInit {
  productionRecords: PageObject<ProductionRecord[]>;
  objects: PageObject<Facility[]>;

  params: HttpParams;
  page = 1;

  constructor(private lineService: LineService) {
  }

  ngOnInit() {
    this.lineService.getProductionRecords().subscribe(value => {
      this.productionRecords = value;
      console.log(value);
    })
  }

  pageChanged(p: any) {
    const uri = p > this.page ? this.productionRecords.next : this.productionRecords.previous;
    const url_params = uri.replace(/^.*\/\??/, '');
    this.params = new HttpParams({fromString: url_params})
    this.lineService.getProductionRecords(this.params.set('page', p)).subscribe(objects => this.productionRecords = objects);
    this.page = p;
    window.scrollTo(1, 1);
  }
}
