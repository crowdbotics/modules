import axios from "axios";
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value
const baseUrlGoogle = "https://www.googleapis.com/calendar/v3/calendars";

const googleAuthAPI = axios.create({
  baseURL: baseUrlGoogle,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

function createAppointment(accessToken, payload) {
  return googleAuthAPI.post("/primary/events?conferenceDataVersion=1", payload, {
    Authorization: `Bearer ${accessToken}`
  });
}

function deleteAppointment(accessToken, id) {
  return googleAuthAPI.delete(`/primary/events/${id}`, null, {
    Authorization: `Bearer ${accessToken}`
  });
}

function getAppointmentByDate(payload) {
  console.log("Data: ", payload);
  return googleAuthAPI.get(`/primary/events?showDeleted=false&orderBy=startTime&singleEvents=true&maxResults=${payload.maxResults}&timeMin=${payload.datetime}`, null, {
    headers: { Authorization: `Bearer ${payload.accessToken}` }
  });
}

function getAllAppointments(accessToken) {
  return googleAuthAPI.get("/primary/events?showDeleted=false&orderBy=startTime&singleEvents=true", null, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}

function createSlackChannel(accessToken, payload) {
  return authAPI.post("/modules/slack/service/create-channel/", payload, {
    Authorization: `Token ${accessToken}`
  });
}

function createGoogleFolder(accessToken, payload) {
  return authAPI.post("/modules/drive/service/create/folder/", payload, {
    Authorization: `Token ${accessToken}`
  });
}

function createHubSpotContact(payload) {
  return authAPI.post("/modules/hubspot/service/create-contact/", payload);
}

function createHubSpotDeal(payload) {
  return authAPI.post("/modules/hubspot/service/deals/create/", payload);
}

export const api = {
  createAppointment,
  deleteAppointment,
  getAppointmentByDate,
  getAllAppointments,
  createSlackChannel,
  createGoogleFolder,
  createHubSpotContact,
  createHubSpotDeal
};
