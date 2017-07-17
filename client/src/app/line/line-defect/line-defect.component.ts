import {Component, OnInit} from '@angular/core';
import {LineService} from 'app/_services/line.service';
import {Branch} from 'app/_models/line';
import {Defect, DefectsCategory} from "../../_models/line";
import {PageObject} from "../../_models/shared";
import {NgForm} from '@angular/forms';
import {HttpClient, HttpParams} from "@angular/common/http";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-line-defect',
  templateUrl: './line-defect.component.html',
  styleUrls: ['./line-defect.component.css'],

})
export class LineDefectComponent implements OnInit {
  objects: PageObject<Defect>;
  isActive = true;
  lines: Line[];
  branches: Branch[];
  categories: DefectsCategory[];
  page: number;
  params: HttpParams;
  url: string;

  constructor(private lineService: LineService,
              private http: HttpClient) {
  }

  ngOnInit() {
    console.log(this.isActive);
    this.lineService.getLines().subscribe(lines => this.lines = lines);
    this.lineService.getBranches().subscribe(branches => this.branches = branches);
    this.lineService.getDefects().subscribe(objects => this.objects = objects);
    this.lineService.getCategories().subscribe(categories => this.categories = categories);
  }

  pageChanged(p: any) {
    const url_params = this.objects.next.replace(/^.*\/\??/, "");
    this.params = new HttpParams({fromString: url_params})
    this.lineService.getDefects(this.params.set('page', p)).subscribe(objects => this.objects = objects);
    this.page = p;
    window.scrollTo(1, 1);
  }
  search(form: NgForm): void {
    const dict = form.value;
    this.params = new HttpParams({fromObject: dict})
    this.lineService.getDefects(this.params).subscribe(objects => this.objects = objects);
  }

  download(): void {
    if (this.objects.next) {
      const url_params = this.objects.next.replace(/^.*\/\??/, "");
      this.params = new HttpParams({fromString: url_params})
    }
    this.lineService.getDefectsXLSX(this.params);
  }
}
