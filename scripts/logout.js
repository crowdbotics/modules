import { invalid, section, valid } from "../utils.js";
import { REQUIRED_USER_PROPS } from "./login.js";
import { performLogout } from "./utils/auth.js";
import { TOKEN_CONFIG_NAME } from "./utils/constants.js";
import { configFile } from "./utils/configFile.js";

export const logout = async () => {
  section("Logging out of session");

  try {
    await performLogout();

    // clear user properties
    REQUIRED_USER_PROPS.forEach((key) => {
      configFile.set(key, "");
    });
    configFile.set(TOKEN_CONFIG_NAME, "");
    configFile.save();
  } catch (e) {
    return invalid(
      "An error occurred while logging out. Please try again later."
    );
  }
  valid("Logout successful");
};
