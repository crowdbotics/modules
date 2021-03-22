import path from "path";
import { clean, execShellCommand } from "./utils.js";

const APP_NAME = "demo";
const version = "0.64.0";
const template = path.join("file:/", process.cwd(), "scaffold");

clean({ target: APP_NAME });
execShellCommand(
  `npx react-native init ${APP_NAME} --template ${template} --version ${version}`
).then(() => {
  process.chdir(path.join(process.cwd(), APP_NAME));
  execShellCommand("yarn install");
});
