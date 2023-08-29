import base64 from "react-native-base64";
import options from "./options";

export const API_URL = "https://api.zoom.us";

export const parseQueryString = (url) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params = {};
  let match;
  /* eslint-disable no-cond-assign */
  while (match = regex.exec(url)) {
    params[match[1]] = match[2];
  }
  return params;
};

export const parseMeetingId = (url) => {
  return url.split("?").shift().split("/").pop();
};

export const parseStartDate = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" +
          date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
};

export const makeId = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const getOauthToken = async (code, codeVerifier) => {
  const res = await fetch(`${API_URL}/oauth/token?code=${code}&grant_type=authorization_code&redirect_uri=${options.REDIRECT_URI}&code_verifier=${codeVerifier}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Basic ${base64.encode(`${options.CLIENT_ID}:${options.CLIENT_SECRET}`)}`
    },
    body: JSON.stringify({})
  });
  return res.json();
};

export const getCurrentUser = async (token) => {
  const res = await fetch(`${API_URL}/v2/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const createMeeting = async (userId, payload, token) => {
  const res = await fetch(`${API_URL}/v2/users/${userId}/meetings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

export const getMeetingList = async (userId, token) => {
  const res = await fetch(`${API_URL}/v2/users/${userId}/meetings?type=upcoming`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const deleteMeeting = async (meetingId, token) => {
  await fetch(`${API_URL}/v2/meetings/${meetingId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
