import fs from "fs";
import path from "path";
import { execShellCommand } from "./utils.js";

const module = process.argv.slice(2)[0];
const demoDir = path.join(process.cwd(), "demo");

const originModuleDir = path.join(process.cwd(), "react-native", module);
const targetModuleDir = path.join(demoDir, "src", "modules", module);
const moduleName = `@modules/${module}`;

let packages = [moduleName];

// Remove x-dependencies
const packageJSON = JSON.parse(
  fs.readFileSync(path.join(originModuleDir, "package.json"))
);
if (packageJSON.hasOwnProperty("x-dependencies")) {
  const deps = packageJSON["x-dependencies"];
  for (const [key, _] of Object.entries(deps)) {
    packages.push(`${key}`);
  }
}

// Remove packages
packages = packages.join(" ");
execShellCommand(`cd ${demoDir} && yarn remove ${packages}`);
execShellCommand(`rm -rf ${targetModuleDir}`)
