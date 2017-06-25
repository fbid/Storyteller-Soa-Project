import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Post } from '../models/post.model';
import { ErrorService } from './error.service';

@Injectable()
export class PostService {

  private posts: Post[] = [];

  constructor( private http: Http, private errorService: ErrorService ) { }

  getPosts() {
    return this.http.get('api/stories')
      .map((response: Response) => {
        return response.json();
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
        this.posts.splice(this.posts.indexOf(post), 1); //Remove the post from posts local array.
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  addPostToUserFavourites(postId: string, userId:string) {
    const token = localStorage.getItem('token');
    const headers = new Headers({'Content-Type': 'application/json', 'x-access-token': token});
    const reqBody = JSON.stringify({id: postId});

    return this.http.patch('api/user/'+ userId + '/favourites', reqBody, {headers: headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getFavouritePosts(userId: string){
    const token = localStorage.getItem('token');
    const headers = new Headers({'Content-Type': 'application/json', 'x-access-token': token});

    return this.http.get('api/user/'+ userId + '/favourites', {headers: headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  removePostFromFavourites(postId:string, userId:string){
    const token = localStorage.getItem('token');
    const headers = new Headers({'Content-Type': 'application/json', 'x-access-token': token});

    return this.http.delete('api/user/'+userId+'/favourites/'+postId, {headers: headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
}
