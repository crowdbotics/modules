import inquirer from "inquirer";
import { section } from "../../utils.js";
import { configFile } from "../utils/configFile.js";
import { AMPLITUDE_API_KEY, HAS_ASKED_OPT_IN_NAME, OPT_IN_NAME } from "./config.js";
import { init, track } from "@amplitude/analytics-node";

export const askOptIn = async () => {
  const { optInStatus } = await inquirer.prompt({
    message: "Send diagnostics & usage to Crowdbotics (y/n):",
    name: "optInStatus",
    type: "input"
  });

  if (optInStatus.trim().toLowerCase() !== "y") {
    section("Thanks for your response. We will not send diagnostics & usage.");
    configFile.set(OPT_IN_NAME, false);
  } else {
    section("Thanks for your response. We will send diagnostics & usage.");
    configFile.set(OPT_IN_NAME, true);
  }
  configFile.set(HAS_ASKED_OPT_IN_NAME, true);
  configFile.save();
};

export const sendAmplitudeEvent = (eventProperties) => {
  const username = configFile.get("email");
  const isOptedIn = configFile.get(OPT_IN_NAME) || false;
  try {
    // track only if email is available and user is opted In
    if (username && isOptedIn) {
      init(AMPLITUDE_API_KEY);

      // track the event
      track("Crowdbotics CLI", eventProperties, {
        user_id: username
      });
    }
  } catch (error) {
    track("Crowdbotics CLI", { ...eventProperties, amplitudeError: error }, {
      user_id: username
    });
  }
};
