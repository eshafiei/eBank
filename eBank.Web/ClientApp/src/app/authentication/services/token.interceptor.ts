import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.auth.getToken();
    const loginUrl = 'login';
    const weatherUrl = 'openweathermap';
    const tokenUrl = 'token';
    // if (request.url.search(loginUrl) === -1 && request.url.search(weatherUrl) === -1 && request.url.search(tokenUrl) === -1) {
    //   request = request.clone({
    //     setHeaders: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     }
    //   });
    // }
    return next.handle(request);
  }
}

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     return next.handle(request).pipe(
//       catchError((response: any) => {
//         if (response instanceof HttpErrorResponse && response.status === 401) {
//           localStorage.removeItem('token');
//           this.router.navigateByUrl('/login');
//         }
//         return throwError(response);
//       }));
//   }
// }
