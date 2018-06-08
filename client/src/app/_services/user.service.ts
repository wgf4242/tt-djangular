import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


import {User} from '../_models/user';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token });

        // get users from api
        return this.http.get<User[]>('/api/users', {headers: headers});
            // .map((response: Response) => response.json());
    }
}
