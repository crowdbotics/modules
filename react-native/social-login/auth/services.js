import axios from 'axios';
import { appConfig } from '../../../config/app';

const socialLoginAPI = axios.create({
  baseURL: appConfig.emailAuthAPIEndPoint, // your app back-end url
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

function apiLoginRequest(action) {
  return socialLoginAPI.post(`/api/v1/login/`, null, {
    data: action.data,
  });
}

function apiSignupRequest(action) {
  return socialLoginAPI.post(`/api/v1/signup/`, {
    data: action.data,
  });
}

function apiLogoutRequest(action) {
  return socialLoginAPI.post(`/rest-auth/logout/`, null, {
    headers: { Authorization: `Token ${action.token}` },
  });
}

function apiAuthUserRequest(action) {
  return socialLoginAPI.get(`/rest-auth/user/`, null, {
    headers: { Authorization: `Token ${action.token}` },
  });
}

function apiResetPasswordRequest(action) {
  return socialLoginAPI.post(`/rest-auth/password/reset/`, null, {
    data: action.data,
  });
}

function apiFacebookLogin(data) {
  return socialLoginAPI.post(`/modules/social-auth/facebook/login/`, null, {
    data,
  });
}

function apiGoogleLogin(data) {
  return socialLoginAPI.post(`/modules/social-auth/google/login/`, null, {
    data,
  });
}

function apiAppleLogin(data) {
  return socialLoginAPI.post(`/modules/social-auth/apple/login/`, null, {
    data,
  });
}

export const authServices = {
  apiLoginRequest,
  apiSignupRequest,
  apiLogoutRequest,
  apiAuthUserRequest,
  apiResetPasswordRequest,
  apiFacebookLogin,
  apiGoogleLogin,
  apiAppleLogin,
};
