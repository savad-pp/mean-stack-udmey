import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { AuthIntercepter } from './auth/auth-intercepter';
import { ErrorIntercepter } from './error-intercepter';
import {ErrorComponent}from './error/error.component'
import { AngularMaerailModule } from './angular-material.module';



@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ReactiveFormsModule,
  FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AngularMaerailModule
   
    

  ],
  providers: [{provide : HTTP_INTERCEPTORS , useClass : AuthIntercepter,multi : true},
    {provide : HTTP_INTERCEPTORS , useClass : ErrorIntercepter,multi : true}
  ],
  bootstrap: [AppComponent],
    entryComponents:[ErrorComponent]
})
export class AppModule { }
