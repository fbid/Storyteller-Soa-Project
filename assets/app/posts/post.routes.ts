import { Routes } from '@angular/router';
import { PostListComponent } from './post-list.component';
import { InputFormComponent } from '../forms/input-form.component';

export const POST_ROUTES: Routes = [
  { path: '' , redirectTo:'my-feed', pathMatch: 'full' },
  { path: 'my-feed', component: PostListComponent },
  { path: 'add-new', component: InputFormComponent }
];
