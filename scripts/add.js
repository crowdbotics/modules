import fs from "fs";
import path from "path";
import config from "./config.js";
import { execSync } from "child_process";

const modules = process.argv.slice(2);
const cwd = process.cwd();
const demoDir = path.join(process.cwd(), config.demo.directory);

modules.map(module => {
  process.chdir(cwd);
  const originModuleDir = path.join(process.cwd(), "modules", "react-native", module);
  const targetModuleDir = path.join(demoDir, "modules");
  const yarnPath = path.join("file:./modules", module);

  let packages = [yarnPath];
  execSync(`cp -r ${originModuleDir} ${targetModuleDir}`);

  // Install x-dependencies
  const packageJSON = JSON.parse(
    fs.readFileSync(path.join(originModuleDir, "package.json"), "utf8")
  );
  if (packageJSON.hasOwnProperty("x-dependencies")) {
    const deps = packageJSON["x-dependencies"];
    for (const [key, value] of Object.entries(deps)) {
      packages.push(`${key}@${value}`);
    }
  }

  // Install packages
  packages = packages.join(" ");
  process.chdir(demoDir);
  execSync(`yarn add ${packages}`);
});
