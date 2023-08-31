import { getGlobalOptions } from "@options";
import { Platform } from "react-native";

const global = getGlobalOptions();
// Change your BASE_URL in `options/options.js` to edit this value
const BASE_URL = global.url;

export const registerDeviceInfoAPI = async (data, authToken) => {
  const response = await fetch(`${BASE_URL}/modules/firebase-push-notifications/device/${Platform.OS === "ios" ? "apns" : "fcm"}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + authToken
    },
    method: "POST",
    body: JSON.stringify(data)
  });

  const res = await response.json();
  return res;
};

export const fetchNotifications = async (authToken) => {
  const response = await fetch(
    `${BASE_URL}/modules/firebase-push-notifications/notification/`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + authToken
      }
    }
  );
  const res = await response.json();
  return res;
};
