import { Component, OnInit } from '@angular/core';

import { PostComponent } from './post.component'
import { Post } from '../shared/models/post.model';
import { PostService } from '../shared/services/post.service';

@Component ({
  selector: 'app-favourite-posts',
  templateUrl: './post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class FavouritePosts implements OnInit{

  private posts: Post[];

  constructor(private postService: PostService ){ }

  ngOnInit() {
    const currentUser = localStorage.getItem('userId');
    this.postService.getFavouritePosts(currentUser)
      .subscribe(
        postArray => {
          this.posts = postArray;
        },
        error => console.error(error)
      );
  }

}
