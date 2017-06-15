import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Post } from '../models/post.model';

@Injectable()
export class PostService {

  private posts: Post[] = [];

  constructor( private http: Http) { }

  getPosts() {
    return this.http.get('/stories')
      .map((response: Response) => {
        const postArray = response.json();
        let processedPosts : Post[] = [];

        for (let post of postArray) {
          processedPosts.push( new Post (
            post._id,
            post.userId,
            post.author,
            post.title,
            post.mainImg,
            post.content,
            post.date,
            post.tags
          ));
        }

        this.posts = processedPosts;
        return processedPosts;
      })
      .catch((error: Response) => Observable.throw(error.json));
  }

  addPost(post: Post) {
    const token = localStorage.getItem('token');
    const headers = new Headers({'Content-Type': 'application/json', 'x-access-token': token});
    const reqBody = JSON.stringify(post);

    return this.http.post('/stories', reqBody, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json));
  }

  editPost(post: Post) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const reqBody = JSON.stringify(post);

    return this.http.patch('/stories/' + post.id, reqBody, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json));
  }

  deletePost(post: Post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }
}
