import { configFile } from "../utils/configFile.js";
import { HOST_CONFIG_NAME } from "../utils/constants.js";
import { DEVELOPMENT_AMPLITUDE_KEY, PRODUCTION_AMPLITUDE_KEY } from "./constants.js";

export const HAS_ASKED_OPT_IN_NAME = "has-asked-opt-in";
export const OPT_IN_NAME = "opt-in";

export const AMPLITUDE_API_KEY = configFile.get(HOST_CONFIG_NAME) === "https://app.crowdbotics.com/" ? PRODUCTION_AMPLITUDE_KEY : DEVELOPMENT_AMPLITUDE_KEY;
