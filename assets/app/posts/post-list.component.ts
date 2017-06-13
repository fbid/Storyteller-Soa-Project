import { Component, OnInit } from '@angular/core';

import { PostComponent } from './post.component'
import { Post } from '../shared/models/post.model';
import { PostService } from '../shared/services/post.service';

@Component ({
  selector: 'app-post-list',
  template: `<ul>
    <li *ngFor="let post of posts" class="six columns">
      <app-post [postData]='post'></app-post></li>
  </ul>`,
  styleUrls: ['post-list.component.css']
})
export class PostListComponent implements OnInit{

  private posts: Post[];

  constructor(private postService: PostService ){ }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe( (posts: Post[]) => {
        //console.log(posts);
        this.posts = posts;
      });
  }

}
