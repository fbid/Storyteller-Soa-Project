import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector:'app-signup',
  templateUrl: './signup.component.html'
})
export class SignUpComponent {

  private signUpForm: FormGroup;

  constructor( fb:FormBuilder , private authService: AuthService ){
    this.signUpForm = fb.group({
      'username': [null, Validators.required],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'city': [null, Validators.required],
      'country': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'rep-password': [null, Validators.required]
    })
  }

  onSubmit(){
    console.log(this.signUpForm.value);
    const form = this.signUpForm.value;

    //Random mockup avatar construction
    const mf = Math.random() > 0.5 ? 'women' : 'men';
    const rnd_num = Math.round(Math.random() * 100);
    const avatar = 'https://randomuser.me/api/portraits/'+ mf + '/' + rnd_num +'.jpg';

    const user = new User( form.username, form.firstName, form.lastName, form.city, form.country, form.password, form.email, avatar);

    this.authService.signUpUser(user)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );

    this.signUpForm.reset();
  }


}
