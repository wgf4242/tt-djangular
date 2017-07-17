import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Month, MonthObj } from "app/attendance/month";
import { Attend, AttendSum, PageObj } from "app/attendance/attend";

@Injectable()
export class AttendService {
	private attendsUrl = "api/attends";
	constructor (private http: Http){}

	getAttends(): Observable<Attend[]> {
    return this.http.get(this.attendsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  getAttendsSum(id: number): Observable<PageObj[]> {
    const url = `${this.attendsUrl}/sum/${id}`
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || { };
  }
 
  private handleError (error: Response | any) {
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