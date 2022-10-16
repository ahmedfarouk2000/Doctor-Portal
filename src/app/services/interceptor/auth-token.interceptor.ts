import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newHeaders = {
      Authorization: `Bearer ${localStorage.getItem('currentDoctor')}`,
      msg: "Hello Word"
    }
    const modefiedRequest = request.clone({
      headers: new HttpHeaders(newHeaders)
    });
    return next.handle(modefiedRequest);
  }
}
