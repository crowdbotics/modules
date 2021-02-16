import axios from 'axios';
import { appConfig } from "../../../config/app";

const socialLoginAPI = axios.create({
  baseURL: "https://test-deploy-0211-de-19317.botics.co", // your app back-end url
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
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
    headers: {Authorization: `Token ${action.token}`},
  });
}

function apiResetPasswordRequest(action) {
  return socialLoginAPI.post(`/rest-auth/password/reset/`, null, {
    data: action.data,
  });
}

function apiFacebookConnect(data) {
  return socialLoginAPI.post(`/modules/social-auth/facebook/connect/`, null, {
    data
  });
}

function apiGoogleConnect(data) {
  return socialLoginAPI.post(`/modules/social-auth/google/connect/`, null, {
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
