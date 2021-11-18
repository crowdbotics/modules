import axios from "axios";
import { getGlobalOptions } from "@options";


const global = getGlobalOptions(); 
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

function apiLoginRequest(payload) {
  return authAPI.post(`/api/v1/login/`, payload);
}

function apiSignupRequest(payload) {
  return authAPI.post(`/api/v1/signup/`, payload);
}

function apiLogoutRequest(payload) {
  return authAPI.post(`/rest-auth/logout/`, null, {
    headers: { Authorization: `Token ${payload.token}` },
  });
}

function apiAuthUserRequest(payload) {
  return authAPI.get(`/rest-auth/user/`, null, {
    headers: { Authorization: `Token ${payload.token}` },
  });
}

function apiResetPasswordRequest(payload) {
  return authAPI.post(`/rest-auth/password/reset/`, payload);
}

export const api = {
  apiLoginRequest,
  apiSignupRequest,
  apiLogoutRequest,
  apiResetPasswordRequest,
  apiAuthUserRequest,
};
