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
  const yarnPath = path.join("file:./modules", module);

  let packages = [yarnPath];
  execShellCommand(`cp -r ${originModuleDir} ${targetModuleDir}`);

  // Install x-dependencies
  const packageJSON = JSON.parse(
    read(path.join(originModuleDir, "package.json"))
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
  execShellCommand(`cd ${demoDir} && yarn add ${packages}`);
});
