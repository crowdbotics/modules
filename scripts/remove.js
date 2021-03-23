import path from "path";
import {
  execShellCommand,
  read
} from "./utils.js";
import config from "./config.js";

const modules = process.argv.slice(2);
const cwd = process.cwd();
const demoDir = path.join(process.cwd(), config.demo.directory);

modules.map(module => {
  process.chdir(cwd);
  const originModuleDir = path.join(process.cwd(), "modules", "react-native", module);
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
  execShellCommand(`yarn remove ${packages}`);
  const rmDir = path.join(targetModuleDir, module);
  execShellCommand(`rm -rf ${rmDir}`)
});
