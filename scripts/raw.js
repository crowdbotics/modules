import fs from "fs";
import path from "path";
import config from "./config.js";
import { execSync } from "child_process";
import { generateCommand } from "./utils.js";

const template = path.join("file:/", process.cwd(), config.scaffold.directory);
const target = path.join(process.cwd(), config.dist.builds.raw.directory);

if (fs.existsSync(target)) {
  fs.rmdirSync(target, { recursive: true });
}

fs.mkdirSync(target);

const command = generateCommand([
  "npx react-native",
  `init ${config.dist.builds.raw.placeholderName}`,
  `--template ${template}`,
  `--version ${config.versions.rn}`,
  `--title "${config.dist.builds.raw.titlePlaceholder}"`
]);

process.chdir(target);
execSync(command);
