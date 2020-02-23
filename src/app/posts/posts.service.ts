import {IPost} from './post.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'

const BACKEND_URL = environment.apiUrl+'/posts/'

@Injectable({providedIn:'root'})
export class PostService{
    private posts:IPost[]=[]
    private postUpdated=new Subject<IPost[]>()


    constructor(private http: HttpClient,private router:Router){}

    getPosts(){
       this.http.get<{message:string,posts:any}>(BACKEND_URL)
       .pipe(map((postData)=>{
           return postData.posts.map(post =>{
               return {
                   title : post.title,
                   content : post.content,
                   id : post._id,
                   imagePath:post.imagePath,
                   creator:post.creator
               };
           })
       }))
       .subscribe((transformedPost)=>{
           console.log(transformedPost)
         this.posts = transformedPost
         this.postUpdated.next([...this.posts]) 
       })
        console.log("get post")
        return this.posts
    }
    getPostUpdateListner(){
        return this.postUpdated.asObservable()
    }

    getPost(id: string){
        //console.log("==edit data get post",id)
        return this.http.get<{_id:string,title:string,content:string,imagePath:string,creator:string}>(BACKEND_URL + id)
    }

    addPost(title:string,content:string,image : File){
        const postData = new FormData()
        postData.append('title',title)
        postData.append('content',content)
        postData.append('image',image,title)

        this.http.post<{message:string, post:IPost}>
        (BACKEND_URL,postData)
        .subscribe((respondsData)=>{
           const post:IPost ={ id:respondsData.post.id,title:title,
            content:content,imagePath:respondsData.post.imagePath,creator:null}
           // const id=respondsData.post
           // console.log("added id",id)
          //  post.id = id
            this.posts.push(post)
            this.postUpdated.next([...this.posts])
            this.router.navigate(['/'])
        })
       
    }

    deletePost(postId:string){
        this.http.delete(BACKEND_URL+postId)
        .subscribe(()=>{
            console.log("deleted")
            const updatedPost = this.posts.filter(post=> post.id !== postId)
            this.posts = updatedPost
            this.postUpdated.next([...this.posts])
        })
    }

    updatePost(id:string,title:string, content:string,image: File | string){
        let postData
        if(typeof(image) === 'object'){
             postData = new FormData()
             postData.append('id',id)
        postData.append('title',title)
        postData.append('content',content)
        postData.append('image',image,title)

        }else{
             postData={id:id,title:title ,content:content,imagePath:image,creator:null}

        }
        
        //const post:IPost={id:id,title:title ,content:content,imagePath:null}
        this.http.put(BACKEND_URL+id,postData)
        .subscribe(response=>{
            const updatedPost = [...this.posts]
            const oldPostIndex = updatedPost.findIndex(p=>p.id===id)
            const post : IPost = {
                id:id,title:title ,content:content,imagePath:"response.image",creator:null
            }
            updatedPost[oldPostIndex]=postData
            this.posts=updatedPost
            this.postUpdated.next([...this.posts])
            this.router.navigate(['/'])
        })


    }
}