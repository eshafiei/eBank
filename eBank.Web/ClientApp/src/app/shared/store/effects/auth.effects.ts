import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../../authentication/services/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure } from '../actions/user.actions';
import { User } from 'src/app/authentication/models/user';

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
                return this.authService.logIn(payload.email, payload.password).pipe(
                  map((user) => {
                    console.log(user);
                    return new LogInSuccess({token: user.token, email: payload.email});
                  }),
                  catchError((error) => {
                    console.log(error);
                    return of(new LogInFailure({ error: error }));
                  }));
            })
        );

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user: User) => {
            localStorage.setItem('token', user.token);
            this.router.navigateByUrl('account');
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );
}
