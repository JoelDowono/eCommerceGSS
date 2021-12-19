import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
		if (this.storageService.isTokenPresent()) {
			authReq = request.clone({
				headers: request.headers.set(
					"Authorization",
					"Bearer "+ this.storageService.getToken()
				)
			});
		}

		return next.handle(authReq);
  }
}
