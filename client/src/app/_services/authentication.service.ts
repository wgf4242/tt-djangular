
import { of as observableOf, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { nextTick } from 'q';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  // login(username: string, password: string): Observable<any> {
  // login(username: string, password: string): Observable<any> {
  login(username: string, password: string): Observable<boolean> {
    return this.http.post('/api/authenticate/', JSON.stringify({ username: username, password: password }),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }).pipe(map((response) => {
        // login successful if there's a jwt token in the response
        console.log(response);
        const token = response['token'];
        // let token = JSON.parse(JSON.stringify(response)["token"]);
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }), catchError(err => observableOf(false)), )
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
