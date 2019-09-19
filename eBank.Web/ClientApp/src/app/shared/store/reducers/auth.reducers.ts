import { User } from '../../../authentication/models/user.interface';
import { AuthActionTypes, All } from '../actions/auth.actions';
import { ErrorResponse } from '../../../authentication/models/error-response.interface';

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessages: ErrorResponse[] | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessages: null
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
      case AuthActionTypes.LOGIN_SUCCESS: {
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
      default: {
        return state;
      }
    }
}
