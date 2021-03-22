import path from "path";
import { clean, execShellCommand } from "./utils.js";
import config from "../config.js";

const template = path.join("file:/", process.cwd(), "scaffold");

clean({ target: path.join(process.cwd(), config.demo.directory) });

execShellCommand(
  `npx react-native init ${config.demo.name} --template ${template} --version ${config.versions.rn}`
);
