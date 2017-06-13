import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector:'app-signup',
  templateUrl: './signup.component.html'
})
export class SignUpComponent {

  private signUpForm: FormGroup;

  constructor( fb:FormBuilder ){
    this.signUpForm = fb.group({
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  onSubmit(){
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }


}
