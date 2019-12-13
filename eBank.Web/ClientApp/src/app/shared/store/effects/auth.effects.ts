import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../../authentication/services/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess,
    LogInFailure, SignUp, SignUpSuccess, SignUpFailure,
    TokenFailure, TokenSuccess, RefreshToken } from '../actions/auth.actions';
import { TokenResponse } from 'src/app/authentication/models/token-response.interface';

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private auth: AuthService,
        private router: Router
    ) {}

    // effects go here
    @Effect()
    LogIn: Observable<any> = this.actions
        .pipe(
            ofType(AuthActionTypes.LOGIN),
            map((action: LogIn) => action.payload),
            switchMap(payload => {
                return this.auth.logIn(payload.username, payload.password).pipe(
                  map((response: any) => {
                    return new LogInSuccess(response.id);
                  }),
                  catchError((httpErrorResponse) => {
                    return of(new LogInFailure({ errors: httpErrorResponse.error }));
                  }));
            })
        );

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((response: any) => {
            localStorage.setItem('userId', response.payload);
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE),
        tap((error: any) => {
            // console.log(error);
        })
    );

    @Effect()
    RefreshToken: Observable<any> = this.actions
        .pipe(
            ofType(AuthActionTypes.REFRESH_TOKEN),
            map((action: RefreshToken) => action.payload),
            switchMap(payload => {
                return this.auth.refreshToken(payload.username, payload.password).pipe(
                    map((tokenInfo: any) => {
                        return new TokenSuccess(tokenInfo, payload.username);
                    }),
                    catchError((httpErrorResponse) => {
                        return of(new TokenFailure({ errors: httpErrorResponse.error }));
                    })
                );
            })
        );

    @Effect({ dispatch: false })
    TokenSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.TOKEN_SUCCESS),
        tap((response: any) => {
            localStorage.setItem('token', response.tokenInfo.access_token);
            localStorage.setItem('username', response.username);
            this.router.navigate(['account']);
        })
    );

    @Effect({ dispatch: false })
    TokenFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.TOKEN_FAILURE)
    );

    @Effect()
    SignUp: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP),
        map((action: SignUp) => action.payload),
        switchMap(payload => {
            return this.auth.signUp(payload).pipe(
                map((tokenInfo: TokenResponse) => {
                    return new SignUpSuccess(tokenInfo, payload.username);
                }),
                catchError((httpErrorResponse) => {
                    console.log(httpErrorResponse);
                    return of(new SignUpFailure({ errors: httpErrorResponse.error }));
                }));
        })
    );

    @Effect({ dispatch: false })
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap((response: any) => {
            // console.log('SignUpSuccess: ', JSON.stringify(response));
            localStorage.setItem('userId', response.tokenInfo.id);
        })
    );

    @Effect({ dispatch: false })
    SignUpFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            this.auth.authStateChanged();
            this.router.navigate(['login']);
        })
    );
}
