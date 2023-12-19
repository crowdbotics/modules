import { valid, invalid, section } from "../utils.js";
import { HAS_ASKED_OPT_IN_NAME, amplitudeInit } from "./amplitude/config.js";
import { askOptIn } from "./amplitude/scripts.js";
import { performLogin } from "./utils/auth.js";
import { configFile } from "./utils/configFile.js";

export const login = async () => {
  section("Login process started");
  const successful = await performLogin();

  if (!successful) {
    return invalid("Unable to complete login at this time.");
  }

  valid("Login Successful!");

  // check config if they have been asked opted in or out of amplitude
  const hasAskedOptIn = configFile.get(HAS_ASKED_OPT_IN_NAME) || false;
  if (!hasAskedOptIn) {
    await askOptIn();
  }

  amplitudeInit();
};
