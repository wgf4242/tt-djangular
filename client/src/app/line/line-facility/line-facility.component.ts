import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LineService } from 'app/_services/line.service';
import { Observable } from 'rxjs';
import { Facility } from '../../_models/line';
import { PageObject } from '../../_models/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { Jsonp } from '@angular/http';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-line-facility',
  templateUrl: './line-facility.component.html',
})
export class LineFacilityComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource$: Observable<PageObject<Facility[]>>;
  params: HttpParams;
  queryParams = {};
  uri = 'line/facility';

  displayedColumns = ['id', 'line', 'branch', 'position', 'category', 'description', 'comment', 'date'];

  constructor(
    private lineService: LineService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSource$ = this.route.queryParamMap.pipe(
      map(params => {
        if (this.router.url.toString().indexOf('?') === -1) { this.paginator.firstPage(); }
        if (!this.params) {
          this.params = new HttpParams();
        }
        Object.keys(params.keys).forEach(k_index => {
          const key = params.keys[k_index];
          const value = params.get(key);
          this.params = this.params.get(key) ? this.params.set(key, value) : this.params.append(key, value);
          this.queryParams[key] = value;
        });
        return this.params;
      }),
      distinctUntilChanged(),
      switchMap(params => {
        console.log(params);
        return this.lineService.getFacilities(params);
      }),
    )
  }

  changes(ev: any) {
    const page = ev.pageIndex + 1;
    this.queryParams['page'] = page;
    this.params = null;
    this.router.navigate([this.uri], { queryParams: this.queryParams });
  }
}
