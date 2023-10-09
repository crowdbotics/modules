import path from "path";
import fs from "fs";
import fse from "fs-extra";
import { section, generateCommand } from "../utils.js";
import { execSync } from "child_process";

export function createDemo(dir, yaml) {
  const execOptions = { encoding: "utf8", stdio: "inherit" };

  const demoDir = path.join(process.cwd(), dir);

  if (fs.existsSync(demoDir)) {
    section("Removing previous demo app");
    fs.rmSync(demoDir, { recursive: true });
  }

  section("Preparing environment");
  execSync("pipenv --python 3.8.17", execOptions);
  execSync("pipenv install cookiecutter", execOptions);

  section("Generating React Native app from scaffold");
  const rnCookieCutterCommand = generateCommand([
    "pipenv run cookiecutter",
    "gh:crowdbotics/react-native-scaffold",
    "--directory dist/cookie",
    "--checkout master",
    `--config-file ${yaml}`,
    "--no-input"
  ]);
  execSync(rnCookieCutterCommand, execOptions);

  section("Installing dependencies");
  execSync("yarn install", {
    cwd: demoDir,
    encoding: "utf8",
    stdio: "inherit"
  });

  section("Generating Django app from scaffold");
  const djangoCookieCutterCommand = generateCommand([
    "pipenv run cookiecutter",
    "gh:crowdbotics/django-scaffold",
    "--checkout master",
    `--config-file ${yaml}`,
    `--output-dir ${dir}`,
    "--no-input"
  ]);

  execSync(djangoCookieCutterCommand, execOptions);
  fse.moveSync(path.join(demoDir, dir), path.join(demoDir, "backend"));
}
