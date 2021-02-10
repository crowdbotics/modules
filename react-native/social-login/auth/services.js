import axios from 'axios';
import { appConfig } from "../../../config/app";

const authAPI = axios.create({
  baseURL: appConfig.emailAuthAPIEndPoint, // your app back-end url
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});

function apiLoginRequest(action) {
  return authAPI.post(`/api/v1/login/`, null, {
    data: action.data,
  });
}
function apiSignupRequest(action) {
  return authAPI.post(`/api/v1/signup/`, {
    data: action.data,
  });
}
function apiLogoutRequest(action) {
  return authAPI.post(`/rest-auth/logout/`, null, {
    headers: {Authorization: `Token ${action.token}`},
  });
}

function apiResetPasswordRequest(action) {
  return authAPI.post(`/rest-auth/password/reset/`, null, {
    data: action.data,
  });
}

function apiFacebookConnect(data) {
  console.log(data)
  return authAPI.post(`/modules/social-auth/facebook/connect/`, null, {
    data
  });
}

function apiGoogleConnect(data) {
  console.log(data)
  return authAPI.post(`/modules/social-auth/google/connect/`, null, {
    data
  });
}

export const authServices = {
  apiLoginRequest,
  apiSignupRequest,
  apiLogoutRequest,
  apiResetPasswordRequest,
  apiFacebookConnect,
  apiGoogleConnect,
};
