import path from "path";
import fs from "fs";
import fse from "fs-extra";
import config from "./config.js";
import { generateCommand } from "./utils.js";
import { execSync } from "child_process";

const template = path.join("file:/", process.cwd(), config.scaffold.directory);

const demoDir = path.join(process.cwd(), config.demo.directory);

if (fs.existsSync(demoDir)) {
  fs.rmdirSync(demoDir, { recursive: true });
}

const command = generateCommand([
  "npx react-native",
  `init ${config.demo.placeholderName}`,
  `--template ${template}`,
  `--version ${config.versions.rn}`
]);

execSync(command);

const cookiecutterCommand = generateCommand([
  "pipenv run cookiecutter",
  "gh:crowdbotics/django-scaffold",
  "--checkout master",
  "--config-file cookiecutter.yaml",
  "--output-dir demo",
  "--no-input"
]);

execSync(cookiecutterCommand);

fse.moveSync(path.join(demoDir, "demo"), path.join(demoDir, "backend"));
