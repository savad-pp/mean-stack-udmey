import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false 
  private authStatusSub:Subscription  
  constructor(public AuthData : AuthService) { }

  ngOnInit() {
   this.authStatusSub =  this.AuthData.getAuthStatusListner().subscribe(authStatus=>{
     this.isLoading = false
   })
  }
  onLogin(form:NgForm){
    if(form.invalid){
      return
    }

    this.isLoading = true
    this.AuthData.login(form.value.email,form.value.password)
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe()

  }
  }

