import axios from 'axios';
import { appConfig } from "../../../config/app";

const authAPI = axios.create({
  baseURL: "https://mobile-march-15-dev-20577.botics.co", // your app back-end url
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

export const authServices = {
  apiLoginRequest,
  apiSignupRequest,
  apiLogoutRequest,
  apiResetPasswordRequest,
  apiAuthUserRequest,
};
