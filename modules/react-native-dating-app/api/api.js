import axios from "axios";
import { getGlobalOptions } from "@options";
import { storage } from "@modules/storage";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" }
});

async function apiProfileRequest(payload) {
  const t = await storage.getToken();
  return authAPI.get("/modules/dating-app-backend/my-profile", {
    headers: { Authorization: `Token ${t}` }
  });
}

async function apiProfileDetails(payload) {
  const t = await storage.getToken();
  return authAPI.get(`/modules/dating-app-backend/profile-details?id=${payload}`, {
    headers: { Authorization: `Token ${t}` }
  });
}

async function apiAllProfilesRequest(payload) {
  const t = await storage.getToken();
  return authAPI.get("/modules/dating-app-backend/all-profiles", {
    headers: { Authorization: `Token ${t}` }
  });
}

async function apiRequestMatch(payload) {
  const t = await storage.getToken();
  return authAPI.post("/modules/dating-app-backend/match-request/", payload, {
    headers: { Authorization: `Token ${t}` }
  });
}

async function apiMatchDenied(payload) {
  const t = await storage.getToken();
  return authAPI.post("/modules/dating-app-backend/un-match-request/", payload, {
    headers: { Authorization: `Token ${t}` }
  });
}

async function apiLoginRequest(payload) {
  return authAPI.post("/api/v1/login/", payload);
}

async function apiSignupRequest(payload) {
  return authAPI.post("/api/v1/signup/", payload);
}

async function apiChatListRequest(payload) {
  const t = await storage.getToken();
  return authAPI.get("/modules/chat/chat_list/", {
    headers: { Authorization: `Token ${t}` }
  });
}

async function apiChatDetailsRequest(payload) {
  const t = await storage.getToken();
  return authAPI.get(`/modules/chat/chat_details/${payload?.id}/`, {
    headers: { Authorization: `Token ${t}` }
  });
}

async function apiSendMessageRequest(payload) {
  const t = await storage.getToken();
  return authAPI.post("/modules/chat/send_message/", payload, {
    headers: { Authorization: `Token ${t}` }
  });
}

async function apiGetMatchesRequest(payload) {
  const t = await storage.getToken();
  return authAPI.get("/modules/dating-app-backend/get-matches/", {
    headers: { Authorization: `Token ${t}` }
  });
}

export const api = {
  apiProfileRequest,
  apiProfileDetails,
  apiAllProfilesRequest,
  apiLoginRequest,
  apiRequestMatch,
  apiSignupRequest,
  apiChatListRequest,
  apiChatDetailsRequest,
  apiSendMessageRequest,
  apiGetMatchesRequest,
  apiMatchDenied
};
