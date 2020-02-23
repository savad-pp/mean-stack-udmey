import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class   ErrorIntercepter implements HttpInterceptor{
    constructor(private dialog:MatDialog){}

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
      
        return next.handle(req).pipe(
          
            catchError((error:HttpErrorResponse)=>{
                let errorMessage = 'Unknown Error'
                if(error.error.message){
                   errorMessage=error.error.message
                }

                //alert(error.error.message)
                this.dialog.open(ErrorComponent,{data:{message:errorMessage }})
                return throwError(error)
            })
        )
    }
    
}