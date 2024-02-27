import { apiClient } from "./apiClient.js";
import { TOKEN_CONFIG_NAME } from "./constants.js";
import { configFile } from "./configFile.js";

/**
 * A more generic approach to cache the current user information for a session.
 */
class User {
  constructor() {
    this._user = {};
  }

  get(property) {
    return this._user[property];
  }

  async setUser(user) {
    if (user) {
      this._user = user;
    } else {
      this._user = await this.load();
    }
  }

  async load() {
    if (configFile.get(TOKEN_CONFIG_NAME)) {
      try {
        const response = await apiClient.get({
          path: "/v2/user/"
        });
        if (!response.ok) return {};

        return await response.json();
      } catch {
        return {};
      }
    }
    return {};
  }
}

export const currentUser = new User();
