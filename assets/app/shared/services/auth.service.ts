import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  constructor( private http: Http) { }

  signInUser(user) {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.post('/auth/signin', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json));
  }

  signUpUser(user) {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.post('/auth/signup', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json));
    }

    userLogout() {
      localStorage.clear();
    }

    isLoggedIn(){
      return localStorage.getItem('token') !== null;
    }
}