import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.odel';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import {environment} from '../../environments/environment'

const BACKEND_URL = environment.apiUrl+'/user/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false
private token:string
private tokenTimer : any
private userId:string
private authStatusListner = new Subject<boolean>()
  constructor(private http : HttpClient,private router:Router) { }

  getToke(){
    return this.token
  }
  getIsAuth(){
    return this.isAuthenticated
  }
  getUserId(){
    return this.userId
  }

  getAuthStatusListner(){
    return this.authStatusListner.asObservable()
  }

  createUser(email:string , password:string){
    const authData : AuthData ={email:email,password:password}
     this.http.post(BACKEND_URL+'/signup',authData).subscribe(()=>{
       this.router.navigate(['/'])
     },error=>{
       this.authStatusListner.next(false)
     })
    
  }

  login(email:string,password:string){
    const authData : AuthData ={email:email,password:password}
    this.http.post<{token:string,expiresIn:number,userId:string}>(BACKEND_URL+'/login',authData)
    .subscribe(response=>{
      console.log('login',response)
      const expiresInDuration =response.expiresIn
      this.setAuthTimer(expiresInDuration)
      const token = response.token
      this.token = token
      if(token){
        this.isAuthenticated = true
        this.userId=response.userId
        console.log('==if token',this.isAuthenticated)
      this.authStatusListner.next(true)
      const now = new Date()
      const expirationDate = new Date(now.getTime()  + (expiresInDuration * 1000))
      console.log(expirationDate)
      this.saveAuthDate(token,expirationDate,this.userId)
      //this.autoAuthUser()
      this.router.navigate(['/'])
      }
    },error=>{
      this.authStatusListner.next(false)
    })
  }

  autoAuthUser(){
  const authInformation =this.getAuthData()
  console.log("==",authInformation)
  const now =new Date()
  if(!authInformation){
    return;
  }
  const expiresIn = authInformation.expirationDate.getTime() - now.getTime()
 
  if (expiresIn > 0){
    this.token = authInformation.token
    this.isAuthenticated = true
    this.userId =authInformation.userId
    this.setAuthTimer(expiresIn/1000)
    this.authStatusListner.next(true)
  }
  }

  logout(){
    this.token = null
    this.authStatusListner.next(false)
    this.isAuthenticated = false
    clearTimeout(this.tokenTimer)
    this.userId = null
    this.clearAuthDate()
    this.router.navigate(['/'])
    
  }
private setAuthTimer(duration:number){
  this.tokenTimer = setTimeout(()=>{
    this.logout()
  },duration * 1000)
}
  private saveAuthDate(token:string,expirationDate:Date,userId:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString())
    localStorage.setItem('userId',userId);
  }
  private clearAuthDate(){
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
  }
  private getAuthData(){
    const token = localStorage.getItem('token')
    const expirationDate=localStorage.getItem('expiration')
    const userId = localStorage.getItem('userId')
    console.log("====",token,expirationDate)
    // if(!token || !expirationDate){
    //   return
    // }
    return {
      token : token,
      expirationDate : new Date(expirationDate),
      userId:userId
    }
  }
}
