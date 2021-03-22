import path from "path";
import { clean, execShellCommand } from "./utils.js";
import config from "../config.js";

const template = path.join("file:/", process.cwd(), config.scaffold.directory);

clean({ target: path.join(process.cwd(), config.demo.directory) });
execShellCommand(
  `npx react-native init ${config.demo.placeholderName} --template ${template} --version ${config.versions.rn}`
);
