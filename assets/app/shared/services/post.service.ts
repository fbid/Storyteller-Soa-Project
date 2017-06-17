import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Post } from '../models/post.model';
import { ErrorService } from './error.service';

@Injectable()
export class PostService {

  private posts: Post[] = [];

  constructor( private http: Http, private errorService: ErrorService) { }

  getPosts() {
    return this.http.get('api/stories')
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
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getPostById(id) {
    return this.http.get('api/stories/'+id)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  addPost(post: Post) {
    const token = localStorage.getItem('token');
    const headers = new Headers({'Content-Type': 'application/json', 'x-access-token': token});
    const reqBody = JSON.stringify(post);

    return this.http.post('api/stories', reqBody, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  editPost(post: Post) {
    const token = localStorage.getItem('token');
    const headers = new Headers({'Content-Type': 'application/json', 'x-access-token': token});
    const reqBody = JSON.stringify(post);

    return this.http.patch('api/stories/'+post.id, reqBody, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  deletePost(post: Post) {
    const token = localStorage.getItem('token');
    const headers = new Headers({'Content-Type': 'application/json', 'x-access-token': token});

    return this.http.delete('api/stories/'+post.id, {headers: headers})
      .map((response: Response) => {
        //Remove the post from posts local array. Otherwise to see the changes you'd need to refresh the page
        this.posts.splice(this.posts.indexOf(post), 1);
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
}
