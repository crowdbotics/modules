import { configFile } from "./configFile.js";
import {
  DEFAULT_HOST,
  HOST_CONFIG_NAME,
  TOKEN_CONFIG_NAME
} from "./constants.js";
import fetch from "node-fetch";
import { formatUrlPath } from "./url.js";
import { invalid } from "../../utils.js";

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

  async _request({
    path,
    body,
    method,
    params,
    anonymous,
    shouldFailOnUnauthorized = true
  }) {
    const host = configFile.get(HOST_CONFIG_NAME) || DEFAULT_HOST;
    let url = `${formatUrlPath(host)}/api/${formatUrlPath(path)}/`;

    if (params) {
      url += "?" + new URLSearchParams(params).toString();
    }

    const response = await fetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: !anonymous ? this._getAuthorizationHeader() : undefined
      },
      method: method
    });

    if (shouldFailOnUnauthorized && response.status === 401) {
      // Flush newline before printing error in case console is in loading state.
      console.log("");
      invalid(
        "Invalid token. Please login and try again.\nRun `cb login` to get started."
      );
    }

    return response;
  }
}

export const apiClient = new ApiClient();
