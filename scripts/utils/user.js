import { apiClient } from "./apiClient.js";

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
    try {
      const response = await apiClient.get({
        path: "/v2/user/"
      });
      if (!response.ok) return {};

      const userBody = await response.json();

      this.user = userBody;
    } catch {
      this.user = {};
    }
    return this.user;
  }
}

export const currentUser = new User();
