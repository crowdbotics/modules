import axios from "axios"

const BASE_URL = "https://your-app-backend.botics.co" // your app back-end url

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})

function apiLoginRequest(payload) {
  return authAPI.post(`/api/v1/login/`, payload)
}

function apiSignupRequest(payload) {
  return authAPI.post(`/api/v1/signup/`, payload)
}

function apiLogoutRequest(payload) {
  return authAPI.post(`/rest-auth/logout/`, null, {
    headers: { Authorization: `Token ${payload.token}` }
  })
}

function apiAuthUserRequest(payload) {
  return authAPI.get(`/rest-auth/user/`, null, {
    headers: { Authorization: `Token ${payload.token}` }
  })
}

function apiResetPasswordRequest(payload) {
  return authAPI.post(`/rest-auth/password/reset/`, payload)
}

function apiFacebookLogin(payload) {
  return authAPI.post(`/modules/social-auth/facebook/login/`, payload)
}

function apiGoogleLogin(payload) {
  return authAPI.post(`/modules/social-auth/google/login/`, payload)
}

function apiAppleLogin(payload) {
  return authAPI.post(`/modules/social-auth/apple/login/`, payload)
}

export const api = {
  apiLoginRequest,
  apiSignupRequest,
  apiLogoutRequest,
  apiResetPasswordRequest,
  apiAuthUserRequest,
  apiFacebookLogin,
  apiGoogleLogin,
  apiAppleLogin
}
