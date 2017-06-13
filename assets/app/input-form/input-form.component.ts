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
      'author': [null, Validators.compose([Validators.required,Validators.maxLength(25)])],
      'content': [null, Validators.required],
      'tags': [null, Validators.required]
    })
  }

  onSubmit(){
    let form = this.addNewForm.value; //Extracting the values from FromGrup obj
    
    this.postService.addPost(new Post(form.content, form.author, new Date(), form.tags.split(',') ));
    this.addNewForm.reset();
  }

}
