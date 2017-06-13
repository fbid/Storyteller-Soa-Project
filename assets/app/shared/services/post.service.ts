import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Post } from '../models/post.model';

@Injectable()
export class PostService {

  private posts: Post[] = [];

  constructor( private http: Http) { }

  addPost(post: Post) {
    //Indispensabile altrimenti invia come tipo text/plain
    const headers = new Headers({'Content-Type': 'application/json'});
    const reqBody = JSON.stringify(post);

    return this.http.post('/stories', reqBody, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json));
  }

  getPosts() {
    return this.http.get('/stories')
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json));
  }

  deletePost(post: Post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }
}
