import axios from "axios";
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

const authAPI = axios.create({
  baseURL: BASE_URL
});

function fetchUserImages(payload) {
  return authAPI.get("/modules/camera/photos/user/");
}

const APP_PLATFORM = "Mobile";

function uploadImage(payload) {
  return authAPI.post("/modules/camera/upload_image/", payload, {
    headers: {
      app_platform: APP_PLATFORM,
      app_version: 1
    }
  });
}

export const api = {
  fetchUserImages,
  uploadImage
};
