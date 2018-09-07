import { Component, OnInit } from '@angular/core';
import { LineService } from 'app/_services/line.service';
import { Branch, Line } from 'app/_models/line';
import { Defect, DefectsCategory, DefectsType } from '../../_models/line';
import { PageObject } from '../../_models/shared';
import { NgForm } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LineDefectDialogComponent } from './line-defect-dialog/line-defect-dialog.component';
import { SnackBarTipComponent } from '../line-summary/snack-bar-tip.component';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-line-defect',
  templateUrl: './line-defect.component.html',
  styleUrls: ['./line-defect.component.css']
})
export class LineDefectComponent implements OnInit {
  objects: PageObject<Defect>;
  lines: Line[];
  branches: Branch[];
  categories: DefectsCategory[];
  page = 1;
  params: HttpParams;
  url: string;
  types: DefectsType[];

  constructor(
    private lineService: LineService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.lineService.getLines().subscribe(lines => (this.lines = lines));
    this.lineService
      .getBranches()
      .subscribe(branches => (this.branches = branches));
    this.lineService
      .getDefects()
      .subscribe(objects => (this.objects = objects));
    this.lineService
      .getCategories()
      .subscribe(categories => (this.categories = categories));
    this.lineService.getDefectType().subscribe(types => (this.types = types));
  }

  pageChanged(p: any) {
    const uri = p > this.page ? this.objects.next : this.objects.previous;
    const url_params = uri.replace(/^.*\/\??/, '');
    this.params = new HttpParams({ fromString: url_params });
    this.lineService
      .getDefects(this.params.set('page', p))
      .subscribe(objects => (this.objects = objects));
    this.page = p;
    window.scrollTo(1, 1);
  }
  search(form: NgForm): void {
    const dict = form.value;
    this.params = new HttpParams({ fromObject: dict });
    this.lineService
      .getDefects(this.params)
      .subscribe(objects => (this.objects = objects));
  }

  download(): void {
    if (this.objects.next) {
      const url_params = this.objects.next.replace(/^.*\/\??/, '');
      this.params = new HttpParams({ fromString: url_params });
    }
    this.lineService.getDefectsXLSX(this.params);
  }

  handle(time: number): void {
    // [time] is string
    // date style follow format props
    console.log(time);
  }

  openDefectDialog(id: number | string) {
    const dialogRef = this.dialog.open(LineDefectDialogComponent, {
      width: '250px',
      data: { id: id }
    });

    dialogRef.afterClosed().pipe(filter(n => n))
      .subscribe(res => {
        console.log(res);
        if (id) {
          // Edit Defect
          this.lineService.updateDefect(res).subscribe(
            v => {
              console.log(v);
              this.openSnackBar();
            },
            err => this.openSnackBar('添加失败')
          );
        } else {
          // Add Defect
          this.lineService.addDefect(res).subscribe(
            v => {
              console.log(v);
              this.openSnackBar();
              this.objects.results.unshift(v);
            },
            err => this.openSnackBar('添加失败')
          );
        }
      });
  }

  openSnackBar(data: string = '添加成功') {
    this.snackBar.openFromComponent(SnackBarTipComponent, {
      duration: 500,
      data: data
    });
  }
}
