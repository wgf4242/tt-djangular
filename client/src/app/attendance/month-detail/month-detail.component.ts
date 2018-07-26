import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Attend } from 'app/_models/attend';
import { Month } from 'app/_models/month';
import { Person } from 'app/_models/person';
import { AttendService } from 'app/_services/attend.service';
import { MonthService } from 'app/_services/month.service';
import { PersonService } from 'app/_services/person.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { SnackBarTipComponent } from '../../line/line-summary/snack-bar-tip.component';
import { AttendDialogComponent } from '../add-normal/attend-dialog.component';

@Component({
  templateUrl: './month-detail.component.html',
  styleUrls: ['./month-detail.component.css']
})
export class MonthDetailComponent implements OnInit {

  month: Month;
  attends: Attend[];
  p: number;

  constructor(private attendService: AttendService,
    private personService: PersonService,
    private monthService: MonthService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    const monthId = this.route.snapshot.params['month'];

    this.route.params.subscribe(params =>
      this.attendService.getAttendsByParams(params).pipe(
        switchMap(attends => {
          this.attends = attends;
          return this.personService.getPersons();
        }),
        map(persons => {
          this.attends = this.attends.map(e => {
            e.person = this.filterPerson(e.person, persons);
            return e;
          });
        })
      ).subscribe(_ => { })
    );
    if (monthId) { this.monthService.getMonth(monthId).subscribe(month => this.month = month); }
  }

  openAttendDialogComponent(value) {
    const dialogRef = this.dialog.open(AttendDialogComponent, {
      width: '250px',
      data: { object: value, title: '编辑记录' }
    });

    dialogRef.afterClosed().pipe(filter(n => n))
      .subscribe(object => {
        this.attendService.updateAttend(object).subscribe(
          _ => this.updateArray(object),
          err => { },
          () => { this.openSnackBar() }
        )
      });
  }

  openSnackBar(data: string = '添加成功') {
    this.snackBar.openFromComponent(SnackBarTipComponent, {
      duration: 500,
      data: data
    });
  }

  updateArray(object: any) {
    const index = this.attends.findIndex(e => e.id === object.id)
    if (index > -1) {
      this.attends[index] = {...this.attends[index], ...object}
    }
  }

  filterPerson(personId: number | string, persons: Array<Person>) {
    const arr = persons.filter(person => person.id === personId);
    return arr.length === 0 ? '离职人员' : arr[0].name;
  }

  delete(id: number) {
    this.attendService.deleteAttend(id).subscribe(value => {
      this.attends = this.attends.filter(obj => obj.id !== id)
    })
  }
}
