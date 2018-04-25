import { Component, OnInit } from '@angular/core';
import {LineService} from "../../_services/line.service";
import {Transformer} from "../../_models/line-transformers";
import {PageObject} from "../../_models/shared";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-line-transformer-list',
  templateUrl: './line-transformer-list.component.html',
  styleUrls: ['./line-transformer-list.component.css']
})
export class LineTransformerListComponent implements OnInit {
  page = 1;
  objects: PageObject<Transformer[]>;
  params: HttpParams;

  constructor(private lineService:LineService) { }

  ngOnInit() {
    this.lineService.getTransformers().subscribe(objects => {
      this.objects = objects;
      const url_params = this.objects.next.replace(/^.*\/\??/, '');
      this.params = new HttpParams({fromString: url_params})
    });
  }

  pageChanged(p: any) {
    this.params = this.params.set('page', p);
    this.lineService.getTransformers(this.params).subscribe(objects => this.objects = objects);
    this.page = p;
  }
}
