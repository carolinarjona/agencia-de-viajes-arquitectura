import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  readonly excludeUrls = ['login']

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    for (const urls of this.excludeUrls) {
      if (request.url.toLowerCase().includes(urls)) {
        return next.handle(request);
      }
    }

    const requestToken = request.clone({ headers: request.headers.set('Authorization', `bearer ${this.authService.bearerToken}`) })
    return next.handle(requestToken);
  }
}
