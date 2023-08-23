import axios from "axios";
import { getGlobalOptions } from "@options";
import { Platform } from "react-native";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

const authAPI = axios.create({
  baseURL: BASE_URL
});

function registerDeviceInfoAPI(payload) {
  return authAPI.post(`/modules/firebase-push-notifications/device/${Platform.OS === "ios" ? "apns" : "fcm"}/`, payload.data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + payload.authToken
    }
  });
}

function fetchNotifications(authToken) {
  return authAPI.get("/modules/firebase-push-notifications/notification/", {
    headers: {
      Authorization: "Token " + authToken
    }
  });
}

export const api = {
  registerDeviceInfoAPI,
  fetchNotifications
};
