import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthIntercepter implements HttpInterceptor{
constructor(private authService : AuthService){}

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        const authToken = this.authService.getToke()
        const authRequest = req.clone({
            headers : req.headers.set('authorization','Bearer '+authToken)
        })
        return next.handle(authRequest)
    }
    
}
//set token iin request header