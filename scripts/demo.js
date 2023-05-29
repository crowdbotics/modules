import path from "path";
import fs from "fs";
import fse from "fs-extra";
import config from "../config.js";
import { generateCommand } from "./utils.js";
import { execSync } from "child_process";

const demoDir = path.join(process.cwd(), config.demo.directory);

if (fs.existsSync(demoDir)) {
  fs.rmSync(demoDir, { recursive: true });
}

const rnCookieCutterCommand = generateCommand([
  "pipenv run cookiecutter",
  "./dist/cookie",
  "--config-file cookiecutter.yaml",
  "--no-input"
]);

execSync(rnCookieCutterCommand, { encoding: "utf8", stdio: "inherit" });
execSync("yarn install", { cwd: demoDir, enconding: "utf8", stdio: "inherit" });

const djangoCookieCutterCommand = generateCommand([
  "pipenv run cookiecutter",
  "gh:crowdbotics/django-scaffold",
  "--checkout master",
  "--config-file cookiecutter.yaml",
  "--output-dir demo",
  "--no-input"
]);

execSync(djangoCookieCutterCommand, { encoding: "utf8", stdio: "inherit" });
fse.moveSync(path.join(demoDir, "demo"), path.join(demoDir, "backend"));
