// @ts-ignore
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url;

const REDIRECT_URI = "https://www.crowdbotics.com/";
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const WEBHOOK_URL = `${BASE_URL}/webhook/`; // http://localhost:8000/webhook/
const WEBHOOK_TAG = "cb-module";

export default {
  REDIRECT_URI: REDIRECT_URI,
  CLIENT_ID: CLIENT_ID,
  CLIENT_SECRET: CLIENT_SECRET,
  WEBHOOK_URL: WEBHOOK_URL,
  WEBHOOK_TAG: WEBHOOK_TAG
};
