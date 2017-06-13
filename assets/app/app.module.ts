import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { PostComponent } from './posts/post.component';
import { PostListComponent } from './posts/post-list.component';
import { PostsComponent } from './posts/posts.component';
import { HeaderComponent } from './shared/layout/header.component';
import { SignInComponent } from './auth/signin.component';
import { SignUpComponent } from './auth/signup.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    PostComponent,
    PostListComponent,
    PostsComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
