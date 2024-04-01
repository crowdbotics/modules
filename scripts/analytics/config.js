import { configFile } from "../utils/configFile.js";
import { HOST_CONFIG_NAME, DEFAULT_HOST } from "../utils/constants.js";
import {
  DEVELOPMENT_SEGMENT_KEY,
  PRODUCTION_SEGMENT_KEY
} from "./constants.js";

export const HAS_ASKED_OPT_IN_NAME = "has-asked-opt-in";
export const OPT_IN_NAME = "opt-in";

export const SEGMENT_API_KEY =
  configFile.get(HOST_CONFIG_NAME) === DEFAULT_HOST
    ? PRODUCTION_SEGMENT_KEY
    : DEVELOPMENT_SEGMENT_KEY;
