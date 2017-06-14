import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { Post } from '../shared/models/post.model';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

  addNewForm: FormGroup; //Form instance

  constructor( private postService: PostService, fb: FormBuilder ) {
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
      null,
      'abc1234UserID',
      'author',
      form.title,
      form.mainImg,
      form.content,
      new Date(),
      form.tags
    );

    this.postService.addPost(newPost)
      .subscribe(
        data => console.log(data),
        err => console.error(err)
      );

    this.addNewForm.reset();
  }

}
