import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Post } from '../shared/models/post.model';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class EditFormComponent implements OnInit{

  editForm: FormGroup; //Form instance
  private sub: any;
  private post: Post;

  constructor(
    private postService: PostService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //Form building
    this.editForm = fb.group({
      'title': [null, Validators.compose([Validators.required,Validators.maxLength(25)])],
      'mainImg': [null, Validators.required],
      'content': [null, Validators.required],
      'tags': [null, Validators.required]
    });
  }


  onSubmit(){
    let form = this.editForm.value; //Extracting the values from FromGrup obj

    //Replace the edited attributes
    this.post.title = form.title;
    this.post.mainImg = form.mainImg;
    this.post.content = form.content;
    this.post.tags = form.tags.replace(/\s/g,'').split(',');

    this.postService.editPost(this.post)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/stories']);
        },
        err => console.error(err)
      );

    this.editForm.reset();
  }

  patchValues(post) {
    this.editForm.patchValue({
      title: post.title,
      mainImg: post.mainImg,
      content: post.content,
      tags: post.tags.join(', '),
    });
  }

  ngOnInit() {
      // Subscribe to route params
      this.sub = this.route.params.subscribe(params => {

        let id = params['id'];
        this.postService.getPostById(id)
          .subscribe(post => {
            post.id = post._id; //duplicate the id attribute
            this.post = post;
            this.patchValues(post); //Populate form
            return this.post;
          });

    });
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

}
