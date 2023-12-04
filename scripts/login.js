import { valid, invalid, section } from "../utils.js";
import { performLogin } from "./utils/auth.js";

export const login = async () => {
  section("Login process started");

  const successful = await performLogin();

  if (!successful) {
    return invalid("Unable to complete login at this time.");
  }

  valid("Login Successful!");
};
