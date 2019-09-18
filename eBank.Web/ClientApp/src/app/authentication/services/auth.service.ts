import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}api/account/login`;
    console.log(url);
    return this.http.post<User>(url, {email, password, ReturnUrl: '/account' });
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.baseUrl}/api/account/register`;
    return this.http.post<User>(url, {email, password});
  }

}
