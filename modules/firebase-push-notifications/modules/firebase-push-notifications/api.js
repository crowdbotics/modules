import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

export const registerDeviceInfoAPI = async (data, authToken) => {
  const response = await fetch(`${BASE_URL}/modules/firebase-push-notifications/user_fcm_device_add/`, {
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
