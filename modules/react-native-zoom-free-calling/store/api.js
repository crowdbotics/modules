import axios from "axios";
import options from "../options";
import base64 from "react-native-base64";

const BASE_URL = "https://api.zoom.us";

const authAPI = axios.create({
  baseURL: BASE_URL
});

function getOauthToken({ code, codeVerifier }) {
  return authAPI.post(`/oauth/token?code=${code}&grant_type=authorization_code&redirect_uri=${options.REDIRECT_URI}&code_verifier=${codeVerifier}`, {}, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64.encode(`${options.CLIENT_ID}:${options.CLIENT_SECRET}`)}`
    }
  });
}

function getCurrentUser(token) {
  return authAPI.get("/v2/users/me", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`
    }
  });
}

function createMeeting({ userId, payload, token }) {
  return authAPI.post(`/v2/users/${userId}/meetings`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

function getMeetingList({ userId, token }) {
  return authAPI.get(`/v2/users/${userId}/meetings?type=upcoming`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`
    }
  });
}

export const api = {
  getOauthToken,
  getCurrentUser,
  createMeeting,
  getMeetingList
};
