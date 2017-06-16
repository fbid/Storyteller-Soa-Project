import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Post } from '../shared/models/post.model';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  private sub: any;
  private post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ){ }

  onEdit(post) {
    console.log(post);
  }

  onDelete(post) {
    post.id = post._id; //Duplicated id as Post model don't have _id field
    this.postService.deletePost(post)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/stories']);
        },
        error => console.error(error)
      );
  }

  ngOnInit() {
      // Subscribe to route params
      this.sub = this.route.params.subscribe(params => {

        let id = params['id'];
        this.postService.getPostById(id)
          .subscribe(post => {
            this.post = post;
            return this.post;
          });

    });
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }
}
