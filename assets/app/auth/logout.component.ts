import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-logout',
  template: `
    <a class="navbar-link" (click)='logout()'>
      Logout
    </a>
  `,
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    console.log('Logging out user...');
    this.authService.userLogout();
    this.router.navigateByUrl('/');
  }

}
