import path from "path";
import fs from "fs";
import fse from "fs-extra";
import { section, generateCommand } from "./utils.js";
import { execSync } from "child_process";

export function createDemo(dir, yaml) {
  const demoDir = path.join(process.cwd(), dir);

  if (fs.existsSync(demoDir)) {
    fs.rmSync(demoDir, { recursive: true });
  }

  const rnCookieCutterCommand = generateCommand([
    "pipenv run cookiecutter",
    "gh:crowdbotics/react-native-scaffold",
    "--checkout master",
    `--config-file ${yaml}`,
    "--no-input"
  ]);

  section("Generating React Native app from scaffold");
  execSync(rnCookieCutterCommand, { encoding: "utf8", stdio: "inherit" });

  section("Installing dependencies");
  execSync("yarn install", {
    cwd: demoDir,
    enconding: "utf8",
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

  execSync(djangoCookieCutterCommand, { encoding: "utf8", stdio: "inherit" });
  fse.moveSync(path.join(demoDir, dir), path.join(demoDir, "backend"));
}
