import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
//import { User } from '../shared/models/user.model';


@Component({
  selector:'app-signin',
  templateUrl: './signin.component.html'
})
export class SignInComponent {

  private signInForm: FormGroup;

  constructor( fb:FormBuilder, private router: Router, private authService: AuthService ){
    this.signInForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  onSubmit(){
    console.log(this.signInForm);
    const form = this.signInForm.value;
    this.authService.signInUser({ email: form.email, password: form.password })
      .subscribe(
        data => {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('username', data.username);
          localStorage.setItem('avatar', data.avatar);
          localStorage.setItem('token', data.token);
        },
        error => console.error(error)
      );

    //this.signInForm.reset();
    this.router.navigateByUrl('/');

  }


}
