import { Action } from '@ngrx/store';
import { TokenResponse } from 'src/app/authentication/models/token-response.interface';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  REFRESH_TOKEN = '[Auth] Refresh Token',
  TOKEN_SUCCESS = '[Auth] Token Success',
  TOKEN_FAILURE = '[Auth] Token Failure',
  LOGOUT = '[Auth] Logout',
  IDLE_TIME = '[Auth] Idle Time'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public tokenInfo: TokenResponse, public username: string) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class RefreshToken implements Action {
  readonly type = AuthActionTypes.REFRESH_TOKEN;
  constructor(public payload: any) {}
}

export class TokenSuccess implements Action {
  readonly type = AuthActionTypes.TOKEN_SUCCESS;
  constructor(public tokenInfo: TokenResponse, public username: string) {}
}

export class TokenFailure implements Action {
  readonly type = AuthActionTypes.TOKEN_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class IdleTime implements Action {
  readonly type = AuthActionTypes.IDLE_TIME;
  constructor(public payload: any) {}
}

export type All =
    | LogIn
    | LogInSuccess
    | LogInFailure
    | SignUp
    | SignUpSuccess
    | SignUpFailure
    | RefreshToken
    | TokenSuccess
    | TokenFailure
    | LogOut
    | IdleTime;
