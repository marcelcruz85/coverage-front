import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
      public auth: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.auth.token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.token}`
            }
        });
    }

    return next.handle(request);
  }
}
