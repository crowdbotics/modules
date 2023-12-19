import inquirer from "inquirer";
import { section } from "../../utils";
import { configFile } from "../utils/configFile";
import { HAS_ASKED_OPT_IN_NAME, OPT_IN_NAME } from "./config";

export const askOptIn = async () => {
  const { optInStatus } = await inquirer.prompt({
    message: "Help Crowdbotics serve you better by sending us analytic information about the commands you used. This information is confidential and will not be shared with other companies (y/n):",
    name: "optInStatus",
    type: "input"
  });

  if (optInStatus.trim().toLowerCase() !== "y") {
    section("Thanks for your response. We will opt you out of analytics.");
    configFile.set(OPT_IN_NAME, false);
  } else {
    section("Thanks for your response. We have opted you into analytics.");
    configFile.set(OPT_IN_NAME, true);
  }
  configFile.set(HAS_ASKED_OPT_IN_NAME, true);
  configFile.save();
};
