import {Injectable, Optional} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {MonthPage, Month} from 'app/_models/month';

@Injectable()
export class MonthService {
  private monthsUrl = 'api/months/';

  constructor(private http: HttpClient) {
  }

  // getMonths(@Optional() params: string = ''): Observable<MonthPage> {
  //   return this.http
  //     .get(this.monthsUrl + params)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

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

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
