
import {switchMap} from 'rxjs/operators';
import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {LineService} from "../../_services/line.service";
import {Transformer} from "../../_models/line-transformers";
import {PageObject} from "../../_models/shared";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Line} from "../../_models/line";
import {NgForm} from "@angular/forms";
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-line-transformer-list',
  templateUrl: './line-transformer-list.component.html',
  styleUrls: ['./line-transformer-list.component.css']
})
export class LineTransformerListComponent implements OnInit{
  // @ViewChild('exampleModal') exampleModal:ElementRef;
  label = '添加记录';

  page = 1;
  objects: PageObject<Transformer[]>;
  params: HttpParams;
  errorMessage: string;
  pushed_transformer = [];
  item:Transformer;
  lines$: Line[];
  // lines$: Observable<Line[]>;

  constructor(private lineService:LineService) { }

  ngOnInit() {
    this.lineService.getTransformers().subscribe(objects => {
      this.objects = objects;
      const url_params = this.objects.next.replace(/^.*\/\??/, '');
      this.params = new HttpParams({fromString: url_params})
    });
    this.lineService.getLines().subscribe(lines => this.lines$ = lines);
  }

  pageChanged(p: any) {
    this.params = this.params.set('page', p);
    this.lineService.getTransformers(this.params).subscribe(objects => this.objects = objects);
    this.page = p;
  }

  edit(id?: number, item?: Transformer) {
    if (item) {
      this.item = item;
      this.label = '编辑记录';
    } else if(id) {
      this.item = this.pushed_transformer.find(item => item.id === id);
      this.label = '编辑记录';
    } else {
      this.item = null;
      this.label = '添加记录';
    }
    $('#exampleModal').modal('toggle');
  }

  submit(value) {
    // update item
    if (value.id) {
      this.lineService.updateTransformer(value).pipe(
        switchMap(item => {
        const index = this.pushed_transformer.findIndex(i => i.id === item.id);
        if (index > -1) {
          this.pushed_transformer[index] = item;
        }
        $('#exampleModal').modal('toggle');
        return this.lineService.getTransformers();
      })).subscribe(objects => this.objects = objects );
        // this.lineService.updateTransformer(value).subscribe(item => {
        //   const index = this.pushed_transformer.findIndex(i => i.id === item.id);
        //   if (index > -1) {
        //     this.pushed_transformer[index] = item;
        //   }
        //   $('#exampleModal').modal('toggle');
        // })
        // this.lineService.getTransformers().subscribe(objects => this.objects = objects);
        return
    }
    // add item
    this.lineService.addTransformer(value).subscribe(item => {
      this.pushed_transformer.push(item);
      this.errorMessage = null;
      $('#exampleModal').modal('toggle');
    }, err => {
      console.log(err);
      this.errorMessage = err;
    });
  }

  delete(id: number | string) {
    this.lineService.deleteTransformer(id).subscribe(item => {
      if (this.pushed_transformer.findIndex(i => i.id === id) > -1){
        this.pushed_transformer = this.pushed_transformer.filter( i => i.id !== id)
      }
    })
  }

  search(form: NgForm) {
    const params = new HttpParams({fromObject: form.value})
    this.lineService.getTransformers(params).subscribe(objects => this.objects = objects);
  }
}
