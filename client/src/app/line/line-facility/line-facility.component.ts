import { Component, OnInit } from '@angular/core';
import { LineService } from 'app/_services/line.service';
import {Facility, FacilityCategory, Line} from '../../_models/line';
import {HttpParams} from '@angular/common/http';
import {PageObject} from '../../_models/shared';

@Component({
  selector: 'app-line-facility',
  templateUrl: './line-facility.component.html',
  styleUrls: ['./line-facility.component.css'],
})
export class LineFacilityComponent implements OnInit {
  objects: PageObject<Facility[]>;
  params: HttpParams;
  page = 1;

  constructor(private lineService: LineService) { }

  ngOnInit() {
    this.lineService.getFacilities().subscribe(objects => {this.objects = objects; console.log(this.objects)} );
  }

  pageChanged(p: any) {
    const uri = (p > this.page) ? this.objects.next : this.objects.previous;
    const url_params = uri.replace(/^.*\/\??/, '');
    this.params = new HttpParams({fromString: url_params})
    this.lineService.getFacilities(this.params.set('page', p)).subscribe(objects => this.objects = objects);
    this.page = p;
    window.scrollTo(1, 1);
  }

}
