import fs from "fs";
import fse from "fs-extra";
import path from "path";
import config from "./config.js";
import find from "find";
import { execSync } from "child_process";

const modules = process.argv.slice(2);
const cwd = process.cwd();
const demoDir = path.join(process.cwd(), config.demo.directory);

const filterMeta = (src, _) => path.basename(src) != "meta.json";

const copy = (origin, target) => {
  fs.mkdirSync(target, { recursive: true });
  fse.copySync(origin, target, { filter: filterMeta });
};

modules.map((module) => {
  process.chdir(cwd);
  const originModuleDir = path.join(process.cwd(), "modules", module);
  const meta = JSON.parse(
    fs.readFileSync(path.join(originModuleDir, "meta.json"), "utf8")
  );
  const targetModuleDir = path.join(demoDir, meta.root);

  const getDeps = (packageJSON) => {
    let packages = [];
    if (packageJSON.hasOwnProperty("x-dependencies")) {
      const deps = packageJSON["x-dependencies"];
      for (const [key, value] of Object.entries(deps)) {
        packages.push(`${key}@${value}`);
      }
    }
    return packages;
  };

  copy(originModuleDir, targetModuleDir);

  find.file(originModuleDir, function (files) {
    files.map((file) => {
      if (path.basename(file) == "package.json") {
        const packageJSON = JSON.parse(fs.readFileSync(file, "utf8"));
        const yarnPath = path.join(
          "file:.",
          meta.root,
          path.dirname(file).replace(originModuleDir, "")
        );
        let packages = [yarnPath, ...getDeps(packageJSON)].join(" ");

        process.chdir(demoDir);
        try {
          execSync(`yarn add ${packages}`);
        } catch (err) {
          console.warn("Failed adding module. Is this module available?");
        }
      }
    });
  });
});
