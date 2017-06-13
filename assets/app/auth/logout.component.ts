import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  template: `
    <button class="logout-btn" (click)="logout()">Logout</button>
  `,
  styles: ['.logout-btn{ background:red; color:#fff}']
})
export class LogoutComponent { }
