import { Routes } from '@angular/router';
import { PostListComponent } from './post-list.component';
import { InputFormComponent } from '../input-form/input-form.component';
import { PostPageComponent } from './post-page.component';

export const POST_ROUTES: Routes = [
  { path: '' , redirectTo:'my-feed', pathMatch: 'full' },
  { path: 'my-feed', component: PostListComponent },
  { path: 'add-new', component: InputFormComponent },
  { path: ':id', component: PostPageComponent }
];
