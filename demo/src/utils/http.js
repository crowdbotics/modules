import axios from "axios";
import { appConfig } from "../config/app";

const APP_PLATFORM = "Mobile";

export const request = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 1
  }
});

export function setupHttpConfig() {
  request.defaults.baseURL = appConfig.emailAuthAPIEndPoint;
  request.defaults.timeout = appConfig.defaultTimeout;
  axios.defaults.headers["Content-Type"] = "application/json";
  // todo add auth token from store

  // you can add more default values for http requests here
}
