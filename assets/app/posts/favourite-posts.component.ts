import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private postService: PostService, private router: Router ){ }

  ngOnInit() {
    const currentUser = localStorage.getItem('userId');

    if(!currentUser){
      this.router.navigateByUrl('/'); //Redirect to homepage if not logged in
    }

    this.postService.getFavouritePosts(currentUser)
      .subscribe(
        postArray => {
          this.posts = postArray;
        },
        error => console.error(error)
      );
  }

}
