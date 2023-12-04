import { configFile } from "./configFile.js";
import { HOST_CONFIG_NAME, TOKEN_CONFIG_NAME } from "./constants.js";
import fetch from "node-fetch";

const DEFAULT_HOST = "https://app.crowdbotics.com/api";

class ApiClient {
  get(options) {
    return this._request({ ...options, method: "GET" });
  }

  post(options) {
    return this._request({ ...options, method: "POST" });
  }

  put(options) {
    return this._request({ ...options, method: "PUT" });
  }

  patch(options) {
    return this._request({ ...options, method: "PATCH" });
  }

  _getAuthorizationHeader() {
    const token = configFile.get(TOKEN_CONFIG_NAME);
    return `Token ${token}`;
  }

  _request({ path, body, method, params, anonymous }) {
    const host = configFile.get(HOST_CONFIG_NAME) || DEFAULT_HOST;
    let url = `${host}${path}`;

    if (params) {
      url += "?" + new URLSearchParams(params).toString();
    }

    return fetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: !anonymous ? this._getAuthorizationHeader() : undefined
      },
      method: method
    });
  }
}

export const apiClient = new ApiClient();
