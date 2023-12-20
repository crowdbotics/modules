import { invalid, section, valid } from "../utils.js";
import { performLogout } from "./utils/auth.js";

export const logout = async () => {
  section("Logging out of session");

  const logoutSuccess = await performLogout();

  if (!logoutSuccess) {
    return invalid("An error occurred while logging out. Please try again");
  }
  valid("Logout successful");
};
