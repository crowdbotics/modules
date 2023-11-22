import path from "path";
import fs from "fs";
import fse from "fs-extra";
import { section, generateCommand } from "../utils.js";
import { execSync } from "child_process";
import { configurePython, execOptions } from "./utils/environment.js";

export function createDemo(dir, yaml) {
  const options = Object.assign(execOptions, {
    cwd: path.dirname(dir)
  });

  if (fs.existsSync(dir)) {
    section("Removing previous demo app");
    fs.rmSync(dir, { recursive: true });
  }

  section("Preparing environment");
  configurePython();
  execSync("pipenv install cookiecutter", options);

  section("Generating React Native app from scaffold");
  const rnCookieCutterCommand = generateCommand([
    "pipenv run cookiecutter",
    "gh:crowdbotics/react-native-scaffold",
    "--directory dist/cookie",
    "--checkout master",
    `--config-file ${yaml}`,
    "--no-input"
  ]);
  execSync(rnCookieCutterCommand, options);

  section("Installing dependencies");
  execSync("yarn install", {
    cwd: dir,
    encoding: "utf8",
    stdio: "inherit"
  });

  section("Generating Django app from scaffold");
  const djangoCookieCutterCommand = generateCommand([
    "pipenv run cookiecutter",
    "gh:crowdbotics/django-scaffold",
    "--checkout master",
    `--config-file ${yaml}`,
    `--output-dir ${path.basename(dir)}`,
    "--no-input"
  ]);
  execSync(djangoCookieCutterCommand, options);
  fse.moveSync(path.join(dir, path.basename(dir)), path.join(dir, "backend"));
}
