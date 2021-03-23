import * as types from "./constants";
import { mapErrorMessage } from "./utils";

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
        token: null,
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

    case types.API_LOGOUT_REQUEST:
      return Object.assign({}, state, {
        api: {
          isLoading: true,
          error: null,
          success: false,
        },
        token: null,
      });
    case types.API_LOGOUT_SUCCESS:
      return Object.assign({}, INITIAL_STATE, {
        api: {
          isLoading: false,
          error: null,
          success: true,
        },
        user: {},
      });
    case types.API_LOGOUT_FAILED:
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
        token: null,
      });
    case types.API_PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: null,
          success: true,
        },
      });
    case types.API_PASSWORD_RESET_FAILED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: mapErrorMessage(action),
          success: false,
        },
      });

    case types.API_AUTH_USER_REQUEST:
      return Object.assign({}, state, {
        api: {
          isLoading: true,
          error: null,
          success: false,
        },
      });
    case types.API_AUTH_USER_SUCCESS:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          error: null,
          success: true,
        },
        user: action.response?.data,
      });
    case types.API_AUTH_USER_FAILED:
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
