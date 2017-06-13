import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector:'app-signin',
  templateUrl: './signin.component.html'
})
export class SignInComponent {

  private signInForm: FormGroup;

  constructor( fb:FormBuilder ){
    this.signInForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  onSubmit(){
    console.log(this.signInForm);
    this.signInForm.reset();
  }


}
