import { valid, invalid, section } from "../utils.js";
import { apiClient } from "./utils/apiClient.js";
import { performLogin } from "./utils/auth.js";
import { configFile } from "./utils/configFile.js";

export const REQUIRED_USER_PROPS = ["email", "first_name", "last_name"];

export const login = async () => {
  section("Login process started");
  const successful = await performLogin();

  if (!successful) {
    return invalid("Unable to complete login at this time.");
  }

  valid("Login Successful!");

  // set user properties to file
  try {
    const userResponse = await apiClient.get({
      path: "/v2/user/"
    });

    const userData = await userResponse.json();

    Object.entries(userData).forEach(([key, value]) => {
      if (REQUIRED_USER_PROPS.includes(key)) {
        configFile.set(key, value);
      }
    });

    configFile.save();
  } catch (error) {
    invalid("An error occurred. Analytics will not be saved");
  }
};
