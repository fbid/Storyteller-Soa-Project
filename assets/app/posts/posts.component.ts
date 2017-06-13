import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  template: `
    <div class="row-spacer"></div>
    <div class="row">
      <button routerLink='my-feed' routerLinkActive='button-primary'>My Feed</button>
      <button routerLink='add-new' routerLinkActive='button-primary'>Add New </button>
    </div>
    <div class="row">
      <router-outlet></router-outlet>
    </div>
  `
})
export class PostsComponent {}
