import { configFile } from "../utils/configFile.js";
import { HOST_CONFIG_NAME } from "../utils/constants.js";

export const HAS_ASKED_OPT_IN_NAME = "has-asked-opt-in";
export const OPT_IN_NAME = "opt-in";

export const AMPLITUDE_API_KEY = configFile.get(HOST_CONFIG_NAME) === "https://app.crowdbotics.com/" ? "production-key-placeholder-text" : "development-key-placeholder-text";
