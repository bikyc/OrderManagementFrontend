import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = localStorage.getItem('token');
    if(jwtToken){
     const requestwithToken = request.clone({
      headers: request.headers.set("Authorization","Bearer "+jwtToken)
        
    });
    return next.handle(requestwithToken);
    }
    else{
      return next.handle(request);
    }

  }
}
