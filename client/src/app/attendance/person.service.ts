import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Person } from './person';

@Injectable()
export class PersonService {
	private personsUrl = 'api/persons/';  // URL to web api
	constructor(private http: Http) { }
	getPersons(): Promise<Person[]> {
		return this.http.get(this.personsUrl)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}