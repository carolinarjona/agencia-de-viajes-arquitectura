import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { catchError, delay, tap } from 'rxjs/operators';

@Injectable()
export class LoadingIndicatorInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loaderService.showLoading(request.url)
    return next.handle(request).pipe(
      delay(500),
      catchError((e) => {
        this.loaderService.hideLoading(request.url);
        return e;
      }),
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          this.loaderService.hideLoading(request.url);
        }
      })
    );
  }
}
