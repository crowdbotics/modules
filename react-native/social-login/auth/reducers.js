import * as types from './constants';
import { mapErrorMessage } from './utils';

const INITIAL_STATE = {
  token: null,
  api: {
    isLoading: false,
    error: null,
    success: false,
  },
  user: {},
};

export default function authApiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.API_LOGIN_REQUEST:
      return Object.assign({}, state, {
        api: {
          isLoading: true,
          error: null,
        },
      });

    case types.API_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: null,
          success: true,
        },
        token: action.response?.data?.token,
        user: action.response?.data?.user,
      });
    case types.API_LOGIN_FAILED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: mapErrorMessage(action),
          success: false,
        },
      });

    case types.API_SIGNUP_REQUEST:
      return Object.assign({}, state, {
        api: {
          isLoading: true,
          error: null,
          success: false,
        },
        token: null
      });
    case types.API_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: null,
          success: true,
        },
        user: action.response?.data,
      });
    case types.API_SIGNUP_FAILED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: mapErrorMessage(action),
          success: false,
        },
      });

    case types.API_SIGNOUT_REQUEST:
      return Object.assign({}, state, {
        api: {
          isLoading: true,
          error: null,
          success: false,
        },
        token: null
      });
    case types.API_SIGNOUT_SUCCESS:
      return Object.assign({}, INITIAL_STATE, {
        api: {
          isLoading: false,
          error: null,
          success: true,
        },
        user: {}
      });
    case types.API_SIGNOUT_FAILED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: mapErrorMessage(action),
          success: false,
        },
      });

    case types.API_PASSWORD_RESET_REQUEST:
      return Object.assign({}, state, {
        api: {
          isLoading: true,
          error: null,
          success: false,
        },
        token: null
      });
    case types.API_PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: null,
          success: true,
        }
      });
    case types.API_PASSWORD_RESET_FAILED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: mapErrorMessage(action),
          success: false,
        },
      });
  
      case types.API_FACEBOOK_CONNECT:
        return Object.assign({}, state, {
          api: {
            isLoading: true,
            error: null,
            success: false,
          },
          token: null
        });
      case types.API_FACEBOOK_CONNECT_SUCCESS:
        console.log(state)
        return Object.assign({}, state, {
          api: {
            isLoading: false,
            error: null,
            success: true,
          },
          token: action.response?.data?.token,
          user: action.response?.data?.user,
        });
      case types.API_FACEBOOK_CONNECT_FAILED:
        return Object.assign({}, state, {
          api: {
            isLoading: false,
            error: mapErrorMessage(action),
            success: false,
          },
        });
    
        case types.API_GOOGLE_CONNECT:
          return Object.assign({}, state, {
            api: {
              isLoading: true,
              error: null,
              success: false,
            },
            token: null
          });
        case types.API_GOOGLE_CONNECT_SUCCESS:
          console.log(state)
          return Object.assign({}, state, {
            api: {
              isLoading: false,
              error: null,
              success: true,
            },
            token: action.response?.data?.token,
            user: action.response?.data?.user,
          });
        case types.API_GOOGLE_CONNECT_FAILED:
          return Object.assign({}, state, {
            api: {
              isLoading: false,
              error: mapErrorMessage(action),
              success: false,
            },
          });

    default:
      return state;
  }
}
