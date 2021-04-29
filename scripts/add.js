import fs from "fs";
import path from "path";
import config from "./config.js";
import find from "find";
import { execSync } from "child_process";

const modules = process.argv.slice(2);
const cwd = process.cwd();
const demoDir = path.join(process.cwd(), config.demo.directory);

modules.map(module => {
  process.chdir(cwd);
  const originModuleDir = path.join(process.cwd(), "modules", module);
  const meta = JSON.parse(
    fs.readFileSync(path.join(originModuleDir, "meta.json"), "utf8")
  );
  const targetModuleDir = path.join(demoDir, meta.root);

  // Install module
  execSync(`mkdir -p ${targetModuleDir}`);
  execSync(`cp -r ${originModuleDir}/* ${targetModuleDir}`);

  // NPM specific step
  find.file(originModuleDir, function(files) {
    files.map(file => {
      if (path.basename(file) == "package.json") {
        // Read package.json
        const packageJSON = JSON.parse(fs.readFileSync(file, "utf8"));

        const yarnPath = path.join("file:.", meta.root, path.dirname(file).replace(originModuleDir, ""));
        let packages = [yarnPath];

        // Install x-dependencies
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
      }
    });
  });
});
