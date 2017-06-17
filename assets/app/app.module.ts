import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InputFormComponent } from './forms/input-form.component';
import { PostComponent } from './posts/post.component';
import { PostListComponent } from './posts/post-list.component';
import { PostsComponent } from './posts/posts.component';
import { HeaderComponent } from './shared/layout/header.component';
import { SignInComponent } from './auth/signin.component';
import { SignUpComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';
import { routing } from './app.routing';
import { AuthService } from './shared/services/auth.service';
import { PostPageComponent } from './posts/post-page.component';
import { EditFormComponent } from './forms/edit-form.component';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './shared/services/error.service';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    PostComponent,
    PostListComponent,
    PostsComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    LogoutComponent,
    PostPageComponent,
    EditFormComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
