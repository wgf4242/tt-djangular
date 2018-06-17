
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';


import {MonthPage, Month} from 'app/_models/month';

@Injectable()
export class MonthService {
  private monthsUrl = 'api/months/';

  constructor(private http: HttpClient) {
  }

  getMonth(id: number): Observable<Month> {
    return this.http.get<Month>(this.monthsUrl + id + '/');
  }

  updateMonth(month: Month): Observable<Month> {
    return this.http.put<Month>(this.monthsUrl + month.id + '/', month);
  }

  getMonths(): Observable<MonthPage> {
    return this.http.get<MonthPage>(this.monthsUrl);
  }

  getMonthActive(): Observable<MonthPage> {
    return this.http.get<MonthPage>(this.monthsUrl + 'active');
  }


  addMonth(month: any): Observable<Month> {
    return this.http.post<Month>(this.monthsUrl, month);
  }
}
