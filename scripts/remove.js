import fs from "fs";
import path from "path";
import config from "./config.js";
import find from "find";
import { execSync } from "child_process";

const modules = process.argv.slice(2);
const cwd = process.cwd();
const demoDir = path.join(process.cwd(), config.demo.directory);

modules.map((module) => {
  process.chdir(cwd);
  const originModuleDir = path.join(process.cwd(), "modules", module);
  const meta = JSON.parse(
    fs.readFileSync(path.join(originModuleDir, "meta.json"), "utf8")
  );
  const targetModuleDir = path.join(demoDir, meta.root);

  const filterPackageJSON = (src, _) => path.basename(src) == "package.json";
  const filterMeta = (src, _) => path.basename(src) != "meta.json";

  // cleanup node_modules
  fs.rmdirSync(path.join(originModuleDir, "node_modules"), { recursive: true });
  fs.rmdirSync(path.join(targetModuleDir, "node_modules"), { recursive: true });

  find.file(originModuleDir, function (files) {
    let file = files.filter(filterPackageJSON)[0];
    if (file) {
      const packageJSON = JSON.parse(fs.readFileSync(file, "utf8"));
      let name = packageJSON.name;
      process.chdir(demoDir);

      try {
        execSync(`yarn remove ${name}`);
      } catch (err) {
        console.warn("Failed removing module. Is this module installed?");
        return;
      }
    }

    files.filter(filterMeta).map((file) => {
      let targetFilePath = path.join(
        targetModuleDir,
        path.relative(originModuleDir, file)
      );

      fs.rmSync(targetFilePath);

      let dir = path.dirname(targetFilePath);
      let files = fs.readdirSync(dir);
      if (files.length == 0) {
        fs.rmdirSync(dir);
      }
    });
  });
});
