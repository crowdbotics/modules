import path from "path";
import { clean, execShellCommand } from "./utils.js";
import config from "../config.js";

const template = path.join("file:/", process.cwd(), config.scaffold.directory);
const target = path.join(process.cwd(), config.dist.builds.raw.directory);

clean({ target: path.join(target, config.dist.builds.raw.placeholderName) });

process.chdir(target);
execShellCommand(
  `npx react-native init ${config.dist.builds.raw.placeholderName} --template ${template} --version ${config.versions.rn} --title "${config.dist.builds.raw.titlePlaceholder}"`
);
