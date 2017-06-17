import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from '../shared/models/post.model';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

  addNewForm: FormGroup; //Form instance

  constructor( private postService: PostService, fb: FormBuilder, private router: Router ) {
    //Form building
    this.addNewForm = fb.group({
      'title': [null, Validators.compose([Validators.required,Validators.maxLength(25)])],
      'mainImg': [null, Validators.required],
      'content': [null, Validators.required],
      'tags': [null, Validators.required]
    })
  }

  onSubmit(){
    let form = this.addNewForm.value; //Extracting the values from FromGrup obj
    let newPost = new Post(
      null, //user related info set to null.
      null, //it will be added in backend code based on the token payload
      null,
      form.title,
      form.mainImg,
      form.content,
      new Date(),
      form.tags.replace(/\s/g,'').split(',')
    );

    this.postService.addPost(newPost)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/stories'])
        },
        err => console.error(err)
      );

    this.addNewForm.reset();
  }

}
