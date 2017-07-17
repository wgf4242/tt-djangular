import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Tour} from 'app/_models/line-tour';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  Branch, Defect, DefectsCategory, DefectsType, Facility, FacilityCategory, Line,
  ProductionRecord
} from '../_models/line';
import {PageObject} from "../_models/shared";
import * as FileSaver from "file-saver";


@Injectable()
export class LineService {
  private tourUrl = 'api/tours/';  // URL to web api
  constructor(private http: HttpClient, httpx: Http) {
  }


  addTour(tour): Observable<Tour> {
    return this.http.post(this.tourUrl, tour)
      .catch(this.handleError);
  }

  getTours(params?: HttpParams): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.tourUrl, {params: params})
  }

  getTour(id: number): Observable<Tour> {
    return this.http.get(this.tourUrl + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putTour(id: number, tour: Tour): Observable<Tour> {
    return this.http.put(this.tourUrl + id, tour)
      .map(this.extractData)
      .catch(this.handleError);
  }


  deleteTour(id: number): Observable<Tour> {
    return this.http.delete(this.tourUrl + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getLines(): Observable<Line[]> {
    return this.http.get<Line[]>('api/lines/');
  }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>('api/branches/');
  }

  getDefects(params?: HttpParams): Observable<PageObject<Defect>> {
    return this.http.get<PageObject<Defect>>('api/defects/', {params: params}).catch(this.handleError);
  }

  addDefect(defect : Defect): Observable<Defect> {
    return this.http.post<Defect>(`api/defects/`, defect).catch(this.handleError);
  }
  getDefect(id: number): Observable<Defect> {
    return this.http.get<Defect>(`api/defects/${id}/`).catch(this.handleError);
  }

  updateDefect(defect: Defect): Observable<Defect> {
    return this.http.put<Defect>(`api/defects/${defect.id}/`, defect).catch(this.handleError);
  }

  getDefectsXLSX(params?: HttpParams) {
    return this.http.get('api/defects.xlsx/', {params: params, responseType: "blob"}).catch(this.handleError).subscribe(
      data => {
        let blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        FileSaver.saveAs(blob, "export.xlsx");
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

  getProductionRecords(params?: HttpParams): Observable<ProductionRecord[]> {
    return this.http.get<ProductionRecord[]>('api/production-records/', {params: params}).catch(this.handleError);
  }

  addProductionRecord(obj: ProductionRecord): Observable<ProductionRecord> {
    return this.http.post<ProductionRecord>('api/production-records/', obj).catch(this.handleError);
  }


  getDefectType(): Observable<DefectsType> {
    return this.http.get<DefectsType>('api/defects-type/').catch(this.handleError);

  }

  // getObjects(url): Observable<Object[]> {
  //   return this.http.get(url)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }


  getCatSuggest(): Observable<CatSuggest[]> {
    return this.http.get<CatSuggest[]>('static/ang/assets/mock/cat.json').catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
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

export class CatSuggest {
  name: string;
  select: string[];
}
