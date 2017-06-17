import { Component } from '@angular/core';

import { PostService } from './shared/services/post.service';

@Component({
  selector: 'app-root',
  template:`
    <app-header></app-header>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <app-error></app-error>
  `,
  styleUrls: ['./app.component.css'],
  providers: [PostService]
})
export class AppComponent {}
