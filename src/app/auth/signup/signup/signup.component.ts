import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { tick } from '@angular/core/testing';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
isLoading=false
private authStatusSub:Subscription  
  constructor(public AuthData : AuthService) { }

  ngOnInit() {
   this.authStatusSub =  this.AuthData.getAuthStatusListner().subscribe(authStatus=>{
     this.isLoading = false
   })
  }
  onSignup(form:NgForm){
    console.log(form.value)
    if(form.invalid){
      return
    }
    this.isLoading = true
    this.AuthData.createUser(form.value.email,form.value.password)
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe()

  }
}
