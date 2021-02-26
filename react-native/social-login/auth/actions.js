import * as types from './constants';

// LOGIN
// {username, password} = data
export const apiLoginRequest = data => ({
  type: types.API_LOGIN_REQUEST,
  data,
});
// {data: {token: '', user: {}}} = response
export const apiLoginSuccess = response => ({
  type: types.API_LOGIN_SUCCESS,
  response,
});
// response is an error object
export const apiLoginFailed = response => ({
  type: types.API_LOGIN_FAILED,
  response,
});

// LOGOUT - pass the api token to the action request 
export const apiLogoutRequest = (token) => ({
  type: types.API_LOGOUT_REQUEST,
  token
});
export const apiLogoutSuccess = response => ({
  type: types.API_LOGOUT_SUCCESS,
  response,
});
export const apiLogoutFailed = response => ({
  type: types.API_LOGOUT_FAILED,
  response,
});

// SIGN UP
export const apiSignupRequest = data => ({
  type: types.API_SIGNUP_REQUEST,
  data,
});
export const apiSignupSuccess = response => ({
  type: types.API_SIGNUP_SUCCESS,
  response,
});
export const apiSignupFailed = response => ({
  type: types.API_SIGNUP_FAILED,
  response,
});

// PASSWORD RESET
export const apiPasswordResetRequest = data => ({
  type: types.API_PASSWORD_RESET_REQUEST,
  data,
});
export const apiPasswordResetSuccess = response => ({
  type: types.API_PASSWORD_RESET_SUCCESS,
  response,
});
export const apiPasswordResetFailed = response => ({
  type: types.API_PASSWORD_RESET_FAILED,
  response,
});

// GET AUTH USER
export const apiAuthUserRequest = token => ({
  type: types.API_AUTH_USER_REQUEST,
  token,
});
export const apiAuthUserSuccess = response => ({
  type: types.API_AUTH_USER_SUCCESS,
  response,
});
export const apiAuthUserFailed = response => ({
  type: types.API_AUTH_USER_FAILED,
  response,
});

// FACEBOOK Connect data: {access_token: ''}
export const apiFacebookLogin = data => ({
  type: types.API_FACEBOOK_LOGIN,
  data,
});
export const apiFacebookLoginSuccess = response => ({
  type: types.API_FACEBOOK_LOGIN_SUCCESS,
  response,
});
export const apiFacebookLoginFailed = response => ({
  type: types.API_FACEBOOK_LOGIN_FAILED,
  response,
});

// GOOGLE Connect data: {access_token: ''}
export const apiGoogleLogin = data => ({
  type: types.API_GOOGLE_LOGIN,
  data,
});
export const apiGoogleLoginSuccess = response => ({
  type: types.API_GOOGLE_LOGIN_SUCCESS,
  response,
});
export const apiGoogleLoginFailed = response => ({
  type: types.API_GOOGLE_LOGIN_FAILED,
  response,
});

// APPLE Connect data: {access_token: ''}
export const apiAppleLogin = data => ({
  type: types.API_APPLE_LOGIN,
  data,
});
export const apiAppleLoginSuccess = response => ({
  type: types.API_APPLE_LOGIN_SUCCESS,
  response,
});
export const apiAppleLoginFailed = response => ({
  type: types.API_APPLE_LOGIN_FAILED,
  response,
});