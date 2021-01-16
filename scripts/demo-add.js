import fs from "fs";
import path from "path";
import { execShellCommand } from "./utils.js";

const module = process.argv.slice(2)[0];
const demoDir = path.join(process.cwd(), "demo");

const originModuleDir = path.join(process.cwd(), "react-native", module);
const targetModuleDir = path.join(demoDir, "src", "modules");
const yarnPath = path.join("file:./src", "modules", module);

let packages = [yarnPath];
execShellCommand(`cp -r ${originModuleDir} ${targetModuleDir}`);

// Install x-dependencies
const packageJSON = JSON.parse(
  fs.readFileSync(path.join(originModuleDir, "package.json"))
);
if (packageJSON.hasOwnProperty("x-dependencies")) {
  const deps = packageJSON["x-dependencies"];
  for (const [key, value] of Object.entries(deps)) {
    packages.push(`${key}@${value}`);
  }
}

// Install packages
packages = packages.join(" ");
execShellCommand(`cd ${demoDir} && yarn add ${packages}`);
