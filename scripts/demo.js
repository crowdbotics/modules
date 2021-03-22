import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import config from "../config.js";
const template = path.join("file:/", process.cwd(), config.scaffold.directory);

fs.rmdirSync(path.join(process.cwd(), config.demo.directory), { recursive: true });
execSync(
  `npx react-native init ${config.demo.placeholderName} --template ${template} --version ${config.versions.rn}`
);
