import { init, setOptOut } from "@amplitude/analytics-node";
import { configFile } from "../utils/configFile";
import { HOST_CONFIG_NAME } from "../utils/constants";

export const HAS_ASKED_OPT_IN_NAME = "has-asked-optin";
export const OPT_IN_NAME = "opt-in";

export const amplitudeInit = () => {
  const amplitudeApiKey = configFile.get(HOST_CONFIG_NAME) === "https://app.crowdbotics.com/" ? "production-placeholder" : "staging-placeholder";
  init(amplitudeApiKey);

  // setOptOut to true if they chose to log out. This will allow us to not send any data to amplitude in parts of the CLI if needed
  if (!configFile.get(OPT_IN_NAME)) {
    setOptOut(true);
  }
};
