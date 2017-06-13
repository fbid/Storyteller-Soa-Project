import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { POST_ROUTES } from './posts/post.routes';
import { SignInComponent } from './auth/signin.component';
import { SignUpComponent } from './auth/signup.component';

const APP_ROUTES: Routes = [
  { path: '' , redirectTo: 'stories/my-feed' , pathMatch: 'full'},
  { path: 'stories', component: PostsComponent, children: POST_ROUTES },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
