import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import {Tour} from 'app/_models/line-tour';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {
  Branch, Defect, DefectsCategory, DefectsType, Facility, FacilityCategory, Line,
  ProductionRecord
} from '../_models/line';
import {PageObject} from '../_models/shared';
import * as FileSaver from 'file-saver';
import {Transformer} from "../_models/line-transformers";
import {catchError} from "rxjs/operators";
import {LoggerService} from "./logger.service";
import {logger} from "codelyzer/util/logger";


@Injectable()
export class LineService {
  private tourUrl = 'api/tours/';  // URL to web api
  constructor(
    private http: HttpClient,
    httpx: Http,
    private logger: LoggerService
  ) {}


  addTour(tour): Observable<Tour> {
    return this.http.post(this.tourUrl, tour)
      .catch(this.handleError2);
  }

  getTours(params?: HttpParams): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.tourUrl, {params: params})
  }

  getTour(id: number): Observable<Tour> {
    return this.http.get(this.tourUrl + id)
      .map(this.extractData)
      .catch(this.handleError2);
  }

  putTour(id: number, tour: Tour): Observable<Tour> {
    return this.http.put(this.tourUrl + id, tour)
      .map(this.extractData)
      .catch(this.handleError2);
  }


  deleteTour(id: number): Observable<Tour> {
    return this.http.delete(this.tourUrl + id)
      .map(this.extractData)
      .catch(this.handleError2);
  }

  getLines(): Observable<Line[]> {
    return this.http.get<Line[]>('api/lines/');
  }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>('api/branches/');
  }

  getDefects(params?: HttpParams): Observable<PageObject<Defect>> {
    return this.http.get<PageObject<Defect>>('api/defects/', {params: params}).catch(this.handleError2);
  }

  addDefect(defect: Defect): Observable<Defect> {
    return this.http.post<Defect>(`api/defects/`, defect).catch(this.handleError2);
  }
  getDefect(id: number): Observable<Defect> {
    return this.http.get<Defect>(`api/defects/${id}/`).catch(this.handleError2);
  }

  updateDefect(defect: Defect): Observable<Defect> {
    return this.http.put<Defect>(`api/defects/${defect.id}/`, defect).catch(this.handleError2);
  }

  getDefectsXLSX(params?: HttpParams) {
    return this.http.get('api/defects.xlsx/', {params: params, responseType: 'blob'}).catch(this.handleError2).subscribe(
      data => {
        const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        FileSaver.saveAs(blob, 'export.xlsx');
      }
    );
    // return this.http.get('api/defects.xlsx/', {params: params, responseType: "blob"}).catch(this.handleError);
  }

  getCategories(): Observable<DefectsCategory[]> {
    return this.http.get<DefectsCategory[]>('api/defects-cat/');
  }

  getFacilities(params?: HttpParams): Observable<PageObject<Facility[]>> {
    return this.http.get<PageObject<Facility[]>>('api/facilities/', {params: params});
  }

  getFacilitiesCategories(): Observable<FacilityCategory[]> {
    return this.http.get<FacilityCategory[]>('api/facilities-cat/');
  }

  addFacility(facility: Facility): Observable<Facility> {
    return this.http.post<Facility>('api/facilities/', facility);
  }

  getObject(url): Observable<Object> {
    return this.http.get<Object>(url);
  }


  getObjects(url): Observable<Object[]> {
    return this.http.get<Object[]>(url);
  }

  addObject(url, object): Observable<Object> {
    return this.http.post<Object>(url, object);
  }

  getProductionRecords(params?: HttpParams): Observable<PageObject<ProductionRecord[]>> {
    return this.http.get<PageObject<ProductionRecord[]>>('api/production-records/', {params: params}).catch(this.handleError2);
  }

  addProductionRecord(obj: ProductionRecord): Observable<ProductionRecord> {
    return this.http.post<ProductionRecord>('api/production-records/', obj).catch(this.handleError2);
  }

  getDefectType(): Observable<DefectsType> {
    return this.http.get<DefectsType>('api/defects-type/').catch(this.handleError2);
  }

  addTransformer(obj: Transformer): Observable<Transformer> {
    return this.http.post<Transformer>('api/transformers/', obj).catch(this.handleError);
  }

  getTransformers(params?: HttpParams): Observable<PageObject<Transformer[]>> {
    return this.http.get('api/transformers/', {params: params}).map(this.extractData4).catch(this.handleError);
  }

  updateTransformer(value: Transformer): Observable<Transformer> {
    let uri = `api/transformers/${value.id}/`;
    return this.http.patch(uri, value ).map(this.extractData4).catch(this.handleError);
  }

  deleteTransformer(id: number | string): Observable<Transformer> {
    let uri = `api/transformers/${id}/`;
    return this.http.delete(uri).map(this.extractData4).catch(this.handleError);
  }

  getCatSuggest(): Observable<CatSuggest[]> {
    // return this.http.get<CatSuggest[]>('static/ang/assets/mock/cat.json').catch(this.handleError);
    return this.http.get<CatSuggest[]>('static/ang/assets/mock/cat.json').pipe(catchError(this.handleError1Extend));
  }

  private extractData(res: Response) {
    const body = res.json();
    console.log(body);
    return body || {};
  }


  private extractData4(res: HttpResponse<any>) {
    console.log(res);
    return res || {};
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    // this.logger.info(error);
    return Observable.throw(error.error || 'Server error')
  }

  private handleError1Extend(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return _throw('Something bad happened; please try again later.');
    // return throwError('Something bad happened; please try again later.');
  }

  private handleError2(error: Response | any) {
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

export class CatSuggest {
  name: string;
  select: string[];
}
