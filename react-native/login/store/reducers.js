import * as types from './constants';
import {mapErrorMessage} from './utils';

const INITIAL_STATE = {
  token: null,
  isLoading: false,
  success: false,
  error: null,
  user: {},
};

export default function authApiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.API_LOGIN_REQUEST:
      return {...state, token: null, error: null, success: false, isLoading: true};

    case types.API_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.response?.data?.token || null,
        error: null,
        isLoading: false,
        success: true,
        user: action.response?.data?.user || {},
      };

    case types.API_LOGIN_FAILED:
      return {
        ...state,
        error: mapErrorMessage(action),
        isLoading: false,
        success: false
      };

    case types.API_SIGNUP_REQUEST:
      return {...state, token: null, error: null, success: false, isLoading: true};

    case types.API_SIGNUP_SUCCESS:
      return {
        ...state,
        token: null,
        user: action.response?.data || '',
        error: null,
        success: true,
        isLoading: false,
      };

    case types.API_SIGNUP_FAILED:
      return {
        ...state,
        error: mapErrorMessage(action),
        success: false,
        isLoading: false,
      };
    case types.API_SIGNUP_REQUEST:
      return {...state, token: null, error: null, success: false, isLoading: true};

    case types.API_SIGNUP_SUCCESS:
      return {
        ...state,
        token: null,
        user: action.response?.data || '',
        error: null,
        success: true,
        isLoading: false,
      };

    case types.API_SIGNUP_FAILED:
      return {
        ...state,
        error: mapErrorMessage(action),
        success: false,
        isLoading: false,
      };
    case types.API_SIGNOUT_REQUEST:
      return {...state, token: null, error: null, success: false, isLoading: true};

    case types.API_SIGNOUT_SUCCESS:
      return {...INITIAL_STATE, success: true};

    case types.API_SIGNOUT_FAILED:
      return {
        ...state,
        error: mapErrorMessage(action),
        success: false,
        isLoading: false,
      };
    case types.API_PASSWORD_RESET_REQUEST:
      return {...state, error: null, success: false, isLoading: true};

    case types.API_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        error: null,
        success: true,
        isLoading: false,
      };

    case types.API_PASSWORD_RESET_FAILED:
      return {
        ...state,
        error: mapErrorMessage(action),
        success: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
