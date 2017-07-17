import { Component, OnInit } from '@angular/core';
import { LineService } from "app/_services/line.service";
import { Branch } from "app/_models/line";
import {Facility, FacilityCategory, Line} from "../../_models/line";
import {HttpParams} from "@angular/common/http";
import {PageObject} from "../../_models/shared";

@Component({
  selector: 'app-line-facility',
  templateUrl: './line-facility.component.html',
  styleUrls: ['./line-facility.component.css'],
})
export class LineFacilityComponent implements OnInit {
  objects: PageObject<Facility[]>;
  category: FacilityCategory[];
  params: HttpParams;
  page: number;

  constructor(private lineService: LineService) { }

  ngOnInit() {
    this.lineService.getFacilities().subscribe(objects => {this.objects = objects;console.log(this.objects)} );
    this.lineService.getFacilitiesCategories().subscribe( category => this.category = category );
  }

  pageChanged(p: any) {
    const url_params = this.objects.next.replace(/^.*\/\??/, "");
    this.params = new HttpParams({fromString: url_params})
    this.lineService.getFacilities(this.params.set("page", p)).subscribe(objects => this.objects = objects);
    this.page = p;
    window.scrollTo(1, 1);
  }

}
