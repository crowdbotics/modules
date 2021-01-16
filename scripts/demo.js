import path from "path";
import { clean, execShellCommand } from "./utils.js";

const APP_NAME = "demo";
const template = path.join("file:/", process.cwd(), "template");

clean({ target: APP_NAME });
execShellCommand(`npx react-native init ${APP_NAME} --template ${template}`);
