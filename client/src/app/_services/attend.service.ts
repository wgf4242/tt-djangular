
import {throwError as observableThrowError, Observable} from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';


import {MonthPage, Month} from 'app/_models/month';
import {Attend, AttendDetail, AttendSum, PageAttendSumObj, AttendPageObject} from 'app/_models/attend';

@Injectable()
export class AttendService {
  private attendsUrl = 'api/attends/';

  constructor(private http: HttpClient) {
  }

  add(object: Attend): Observable<Attend> {
    return this.http.post<Attend>(this.attendsUrl, object).pipe(
      catchError(this.handleError));
  }

  deleteAttend(id: number | string): Observable<Attend> {
    return this.http.delete<Attend>(this.attendsUrl + id + '/').pipe(
      catchError(this.handleError));
  }

  getAttend(id: number): Observable<AttendDetail> {
    return this.http.get<AttendDetail>(this.attendsUrl + id + '/');
  }

  updateAttend(attend: AttendDetail): Observable<AttendDetail> {
    return this.http.put<AttendDetail>(this.attendsUrl + attend.id + '/', attend);
  }

  getAttends(month_id: number): Observable<Attend[]> {
    if (!month_id) {
      return null
    }
    const params = new HttpParams().set('month', month_id.toString());
    return this.http.get<Attend[]>(this.attendsUrl, {params: params});
  }

  getAttendsByParams(p: {}): Observable<Attend[]> {

    const params = new HttpParams({fromObject: p});
    return this.http.get<Attend[]>(this.attendsUrl, {params: params});
  }

  getAttendsByPage(month_id: number): Observable<AttendPageObject> {
    const url = month_id ? this.attendsUrl + '?month_id=' + month_id : this.attendsUrl;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getAttendsSum(id: number | string): Observable<PageAttendSumObj> {
    const url = `${this.attendsUrl}sum/${id}`;
    return this.http.get<PageAttendSumObj>(url);
  }

  private extractData(res: Response) {
    const body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: HttpErrorResponse | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;

    if (error instanceof HttpErrorResponse) {
      const err = JSON.stringify(error.error);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return observableThrowError(errMsg);
  }

  // private handleError(error: Response | any) {
  //   // In a real world app, you might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }

  // private handleError(error: any) {
  //     let errMsg = (error.message) ? error.message :
  //         error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //     console.error(errMsg); // log to console instead
  //     return Observable.throw(errMsg);
  // }

}
