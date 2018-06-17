import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Tour} from 'app/_models/line-tour';
import * as FileSaver from 'file-saver';
import {Observable, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {toNumber} from '../utils/string.utils';
import {Branch, Defect, DefectsCategory, DefectsType, Facility, FacilityCategory, Fault, Line} from '../_models/line';
import {Transformer} from '../_models/line-transformers';
import {ProductionRecord} from '../_models/production';
import {PageObject} from '../_models/shared';
import {LoggerService} from './logger.service';

@Injectable()
export class LineService {
  private tourUrl = 'api/tours/';  // URL to web api
  constructor(private http: HttpClient,
              private logger: LoggerService) {
  }


  addTour(tour): Observable<Tour> {
    return this.http.post<Tour>(this.tourUrl, tour).pipe(
      catchError(this.handleError));
  }

  getTours(params?: HttpParams): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.tourUrl, {params: params})
  }

  getTour(id: number): Observable<Tour> {
    return this.http.get<Tour>(this.tourUrl + id).pipe(
      map(this.extractData),
      catchError(this.handleError),);
  }

  putTour(id: number, tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(this.tourUrl + id, tour).pipe(
      map(this.extractData),
      catchError(this.handleError),);
  }


  deleteTour(id: number): Observable<Tour> {
    return this.http.delete<Tour>(this.tourUrl + id).pipe(
      map(this.extractData),
      catchError(this.handleError),);
  }

  getLines(): Observable<Line[]> {
    return this.http.get<Line[]>('api/lines/');
  }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>('api/branches/');
  }

  getDefects(params?: HttpParams): Observable<PageObject<Defect>> {
    return this.http.get<PageObject<Defect>>('api/defects/', {params: params}).pipe(catchError(this.handleError));
  }

  addDefect(defect: Defect): Observable<Defect> {
    return this.http.post<Defect>(`api/defects/`, defect).pipe(catchError(this.handleError));
  }

  getDefect(id: number): Observable<Defect> {
    return this.http.get<Defect>(`api/defects/${id}/`).pipe(catchError(this.handleError));
  }

  updateDefect(defect: Defect): Observable<Defect> {
    return this.http.put<Defect>(`api/defects/${defect.id}/`, defect).pipe(catchError(this.handleError));
  }

  getDefectsXLSX(params?: HttpParams) {
    return this.http.get('api/defects.xlsx/', {
      params: params,
      responseType: 'blob'
    }).pipe(catchError(this.handleError)).subscribe(
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
    return this.http.get<PageObject<ProductionRecord[]>>('api/production-records/', {params: params}).pipe(catchError(this.handleError));
  }

  addProductionRecord(obj: ProductionRecord): Observable<ProductionRecord> {
    return this.http.post<ProductionRecord>('api/production-records/', obj).pipe(catchError(this.handleError));
  }

  getDefectType(): Observable<DefectsType> {
    return this.http.get<DefectsType>('api/defects-type/').pipe(catchError(this.handleError));
  }

  addTransformer(obj: Transformer): Observable<Transformer> {
    return this.http.post<Transformer>('api/transformers/', obj).pipe(
      catchError(this.handleError));
  }

  getTransformers(params?: HttpParams): Observable<PageObject<Transformer[]>> {
    return this.http.get<PageObject<Transformer[]>>('api/transformers/', {params: params}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateTransformer(value: Transformer): Observable<Transformer> {
    const uri = `api/transformers/${value.id}/`;
    // return this.http.patch<Transformer>(uri, value ).pipe(catchError(this.handleError));
    return this.http.patch<Transformer>(uri, value).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // deleteTransformer(id: number | string): Observable<Transformer> {
  deleteTransformer(id: number | string): Observable<any> {
    const uri = `api/transformers/${id}/`;
    return this.http.delete<any>(uri).pipe(catchError(this.handleError));
    // return this.http.delete(uri).map(this.extractData).catch(this.handleError);
  }

  getCatSuggest(): Observable<CatSuggest[]> {
    // return this.http.get<CatSuggest[]>('static/ang/assets/mock/cat.json').catch(this.handleError);
    return this.http.get<CatSuggest[]>('static/ang/assets/mock/cat.json').pipe(catchError(this.handleError));
  }

  addRecord(object: any): any {
    return this.http.post('api/records/', object).pipe(catchError(this.handleError));
  }


  getRecords(params?: HttpParams): Observable<any> {
    return this.http.get('api/records/', {params: params}).pipe(catchError(this.handleError));
  }


  addLineFault(object: any): Observable<any> {
    return this.http.post('api/line-faults/', object).pipe(catchError(this.handleError));
  }

  getLineFaults(params?: HttpParams): Observable<Fault[]> {
    return this.http.get<Fault[]>('api/line-faults/', {params: params}).pipe(catchError(this.handleError));
  }

  getLineInfo(id: number | string): any {
    const uri = `api/lines/${id}/`;
    return this.http.get(uri).pipe(catchError(this.handleError));
  }

  updateLineInfo(object: any): Observable<Line> {
    const uri = `api/lines/${object.id}/`;
    return this.http.patch<Line>(uri, object).pipe(catchError(this.handleError));
  }

  getUpdateFieldsByProduction(object: ProductionRecord): any {
    let addMap = {id: object.line};
    const line_id = object.line;

    return this.getLineInfo(line_id).pipe(
      switchMap(lineObject => {
        console.log('line is ', lineObject);
        addMap = this.getUpdateMap(addMap, object, lineObject);
        return this.updateLineInfo(addMap);
      })
    );
  }


  private getUpdateMap(addMap: any, object: ProductionRecord, lineObject) {
    const total = toNumber(object['transformer']) + toNumber(object['single_disconnector'])
      + toNumber([object['breaker']]) * 2;
    if (total > 0) {
      addMap['disconnector'] = total;
      addMap['grounding_device'] = total;
      addMap['arrester'] = total * 3;
    }

    const arr = ['transformer', 'single_disconnector', 'breaker', 'pole', 'length', 'disconnector', 'grounding_device', 'arrester', 'well'];
    for (const key of arr) {
      if (object[key] || addMap[key]) {
        addMap[key] = toNumber(object[key]) + toNumber(lineObject[key]) + toNumber(addMap[key]);
        // addMap[key] = object[key] + lineObject[key] + addMap[key];
      }
    }

    console.log('map is ', addMap);
    return {...addMap};
  }

  private extractData(res: any) {
    console.log(res);
    return res || {};
  }

  private handleError(error: HttpErrorResponse) {
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
    return throwError(
      'Something bad happened; please try again later.');
  };
}

export class CatSuggest {
  name: string;
  select: string[];
}
