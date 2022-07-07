import path from "path";
import fs from "fs";
import fse from "fs-extra";
import config from "./config.js";
import { generateCommand } from "./utils.js";
import { execSync } from "child_process";

const template = path.join("file:/", process.cwd(), config.scaffold.directory);

fs.rmdirSync(path.join(process.cwd(), config.demo.directory), {
  recursive: true
});

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

fse.moveSync(path.join("demo", "demo"), path.join("demo", "backend"));
