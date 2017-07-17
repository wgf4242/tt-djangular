import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Month, MonthObj } from "app/attendance/month";

@Injectable()
export class MonthService {
	private monthsUrl = "api/months";
	constructor (private http: Http){}

	getMonths(): Observable<Month[]> {
    return this.http.get(this.monthsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  
	getMonth(id: number): Observable<MonthObj> {
    const url = `${this.monthsUrl}/${id}/`
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