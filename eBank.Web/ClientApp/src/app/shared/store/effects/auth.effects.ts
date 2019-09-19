import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../../authentication/services/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure } from '../actions/auth.actions';
import { TokenResponse } from 'src/app/authentication/models/token-response.interface';

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    // effects go here
    @Effect()
    LogIn: Observable<any> = this.actions
        .pipe(
            ofType(AuthActionTypes.LOGIN),
            map((action: LogIn) => action.payload),
            switchMap(payload => {
                return this.authService.logIn(payload.username, payload.password).pipe(
                  map((tokenInfo: TokenResponse) => {
                    return new LogInSuccess(tokenInfo, payload.username);
                  }),
                  catchError((httpErrorResponse) => {
                    console.log(httpErrorResponse);
                    return of(new LogInFailure({ errors: httpErrorResponse.error }));
                  }));
            })
        );

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((response: any) => {
            localStorage.setItem('token', response.tokenInfo.access_token);
            this.router.navigateByUrl('account');
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    SignUp: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP),
        map((action: SignUp) => action.payload),
        switchMap(payload => {
            console.log(payload);
            return this.authService.signUp(payload).pipe(
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
            console.log('sign up success: ', response);
            localStorage.setItem('token', response.tokenInfo.access_token);
            this.router.navigateByUrl('/');
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
            this.router.navigateByUrl('/login');
        })
    );
}
