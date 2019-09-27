import { User } from '../../../authentication/models/user.interface';
import { AuthActionTypes, All, IdleTime } from '../actions/auth.actions';
import { ErrorResponse } from '../../../authentication/models/error-response.interface';

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessages: ErrorResponse[] | null;

    idleStartTime: any;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessages: null,
    idleStartTime: null
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
      case AuthActionTypes.LOGIN_FAILURE: {
        return {
          ...state,
          errorMessages: action.payload.errors
        };
      }
      case AuthActionTypes.SIGNUP_SUCCESS: {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            username: action.username,
            access_token: action.tokenInfo.access_token
          },
          errorMessages: null
        };
      }
      case AuthActionTypes.SIGNUP_FAILURE: {
        return {
          ...state,
          errorMessages: action.payload.errors
        };
      }
      case AuthActionTypes.LOGOUT: {
        return initialState;
      }
      case AuthActionTypes.TOKEN_SUCCESS: {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            username: action.username,
            access_token: action.tokenInfo.access_token
          },
          errorMessages: null
        };
      }
      case AuthActionTypes.TOKEN_FAILURE: {
        return {
          ...state,
          errorMessages: action.payload.errors
        };
      }
      case AuthActionTypes.IDLE_TIME: {
        return {
          ...state,
          idleStartTime: action.payload
        };
      }
      default: {
        return state;
      }
    }
}
