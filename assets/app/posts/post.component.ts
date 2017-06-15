import { Component, Input } from '@angular/core';

import { Post } from '../shared/models/post.model';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent {

  @Input() postData: Post;

  constructor( private postService: PostService ) { }

  onEdit(post) {
    //..
    console.log('Edit post with id:' + post.id );
  }

  onDelete(post) {
    this.postService.deletePost(post)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
  }

}
