import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../models/user.interface';
import { RegisterRequest } from '../models/register-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatedataSource = new BehaviorSubject<boolean>(true);
  authStatus = this.authStatedataSource.asObservable();
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getLoggedInUserName(): string {
    return localStorage.getItem('username');
  }

  getLoggedInUserId(): string {
    return localStorage.getItem('userId');
  }

  refreshToken(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}connect/token`;
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded'
    });
    const options = {
      headers: httpHeaders
    };
    const payload = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('scope', 'api1 openid')
      .set('client_id', 'ro.angular')
      .set('client_secret', 'secret');
    return this.http.post<any>(url, payload, options);
  }

  logIn(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}api/account/login`;
    return this.http.post<boolean>(url, {
      'username': username,
      'password': password
    });
  }

  signUp(userInfo: RegisterRequest): Observable<any> {
    const url = `${this.baseUrl}api/account/register`;
    return this.http.post<User>(url, {
      'username': userInfo.username,
      'password': userInfo.password,
      'firstName': userInfo.firstName,
      'lastName': userInfo.lastName,
      'email': userInfo.email,
    });
  }

  isAdminUser(userId: string): Observable<boolean> {
    const url = `${this.baseUrl}api/account/isAdminUser/`;
    return this.http.get<boolean>(url + userId);
  }

  authStateChanged() {
    this.authStatedataSource.next(true);
  }

}
