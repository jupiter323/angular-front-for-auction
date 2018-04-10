import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
declare var localStorage : any;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let allowedUrls =( request.url.indexOf("dealer/signup") < 0 && request.url.indexOf("dealer/login") < 0 );   
    
    if(allowedUrls){
      
        let authToken = localStorage.getItem("dealertoken");
        request = request.clone({
            headers: request.headers.set('Authorization', 'Bearer '+ authToken)
            /* setHeaders: {
                Authorization: 'Bearer '+ authToken
            } */
        });
    }
    return next.handle(request);
  }
}