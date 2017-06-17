import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { ErrorService } from './error.service';

@Injectable()
export class AuthService {

  constructor( private http: Http, private errorService: ErrorService ) { }

  signInUser(user) {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.post('api/auth/signin', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  signUpUser(user) {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.post('api/auth/signup', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
    }

    userLogout() {
      localStorage.clear();
    }

    isLoggedIn(){
      return localStorage.getItem('token') !== null;
    }
}
