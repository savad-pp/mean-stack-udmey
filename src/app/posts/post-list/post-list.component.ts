import { Component, OnInit,Input } from '@angular/core';
import {IPost} from '../post.model'
import { PostService } from '../posts.service';
import {Subscription} from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
 posts:IPost[] =[]
 isLoading=false;
 private postSub:Subscription;
 private authStatusSub:Subscription
 userId:string
 userIsAuthenticated = false
  constructor(public postService:PostService,public authService : AuthService) { }

  ngOnInit() {
    this.postService.getPosts()
    this.userId = this.authService.getUserId()
    this.isLoading=true
    this.postSub=this.postService.getPostUpdateListner().subscribe((posts:IPost[])=>{
      this.isLoading=false
      this.posts=posts
    })
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authStatusSub = this.authService.getAuthStatusListner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated
      this.userId = this.authService.getUserId()
    })
  }

  ngOnDestroy(){
    this.postSub.unsubscribe()
    this.authStatusSub.unsubscribe()
  }

  onDelete(postId: string){
    this.postService.deletePost(postId)
  }  

}
