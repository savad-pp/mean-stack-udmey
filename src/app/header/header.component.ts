import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
 private authListnerSubs:Subscription
userIsAuthenticated = false
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth()
this.authListnerSubs = this.authService.getAuthStatusListner().subscribe(isAuthenticated=>{
this.userIsAuthenticated = isAuthenticated
})
  }
  ngOnDestroy(): void {
    
  }
  onLogout(){
  this.authService.logout()
  }
}
