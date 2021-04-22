import fs from "fs";
import path from "path";
import config from "./config.js";
import { execSync } from "child_process";

const modules = process.argv.slice(2);
const cwd = process.cwd();
const demoDir = path.join(process.cwd(), config.demo.directory);

modules.map(module => {
  process.chdir(cwd);
  // const originModuleDir = path.join(process.cwd(), "modules", "react-native", module);
  const targetModuleDir = path.join(demoDir, "modules");
  const moduleName = `@modules/${module}`;

  let packages = [moduleName];

  // Remove x-dependencies
  // TODO: Do we want to remove blindly? What if the user installed that dep too?
  // const packageJSON = JSON.parse(
  //   read(path.join(originModuleDir, "package.json"))
  // );
  // if (packageJSON.hasOwnProperty("x-dependencies")) {
  //   const deps = packageJSON["x-dependencies"];
  //   for (const [key, _] of Object.entries(deps)) {
  //     packages.push(`${key}`);
  //   }
  // }

  // Remove packages
  packages = packages.join(" ");
  process.chdir(demoDir);
  execSync(`yarn remove ${packages}`);
  fs.rmdirSync(path.join(targetModuleDir, module), { recursive: true });
});
