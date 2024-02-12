import inquirer from "inquirer";
import { section } from "../../utils.js";
import { configFile } from "../utils/configFile.js";
import { HAS_ASKED_OPT_IN_NAME, OPT_IN_NAME } from "./config.js";

export const askOptIn = async () => {
  const { optInStatus } = await inquirer.prompt({
    message: "Send diagnostics & usage to Crowdbotics (y/n):",
    name: "optInStatus",
    type: "input"
  });

  const optedIn = optInStatus.trim().toLowerCase() === "y";

  if (!optedIn) {
    section("Thanks for your response. We will not send diagnostics & usage.");
    configFile.set(OPT_IN_NAME, false);
  } else {
    section("Thanks for your response. We will send diagnostics & usage.");
    configFile.set(OPT_IN_NAME, true);
  }
  configFile.set(HAS_ASKED_OPT_IN_NAME, true);
  configFile.save();
  return optedIn;
};
