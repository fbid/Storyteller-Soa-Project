import { Component, Input } from '@angular/core';

import { Post } from '../shared/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent {

  @Input() postData: Post;

}
