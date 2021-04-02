import path from "path";
import fs from "fs";
import config from "./config.js";
import { generateCommand } from "./utils.js";
import { execSync } from "child_process";

const template = path.join("file:/", process.cwd(), config.scaffold.directory);

fs.rmdirSync(
  path.join(process.cwd(), config.demo.directory),
  { recursive: true }
);

const command = generateCommand([
  `npx react-native`,
  `init ${config.demo.placeholderName}`,
  `--template ${template}`,
  `--version ${config.versions.rn}`
]);

execSync(command);
