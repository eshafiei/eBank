import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../authentication/services/auth.service';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { RefreshToken } from '../store/actions/auth.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
    private store: Store<AppState>) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.auth.getToken();
    const excludedRequests = ['openweather', 'token'];
    if (excludedRequests.some(element => request.url.search(element) !== -1)) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request).pipe(
      tap(response => {
          if (response instanceof HttpResponse) {
            if (response.body) {
              if (request.url.indexOf('login') !== -1 || request.url.indexOf('register') !== -1) {
                  const username = request.body.username;
                  const password = request.body.password;
                  const payload = {
                    username: username,
                    password: password
                  };
                  this.store.dispatch(new RefreshToken(payload));
                }
              }
          }
      })
    );
  }
}

