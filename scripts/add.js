import fs, { existsSync } from "fs";
import fse from "fs-extra";
import path from "path";
import config from "./config.js";
import find from "find";
import { execSync } from "child_process";

const modules = process.argv.slice(2);
const cwd = process.cwd();
const demoDir = path.join(process.cwd(), config.demo.directory);

const IGNORED_ENTRIES = ["meta.json", "node_modules"];

const filterFiles = (src, _) => !IGNORED_ENTRIES.includes(path.basename(src));

const copy = (origin, target) => {
  fs.mkdirSync(target, { recursive: true });
  fse.copySync(origin, target, { filter: filterFiles });
};

modules.forEach((module) => {
  process.chdir(cwd);
  const originModuleDir = path.join(process.cwd(), "modules", module);
  const meta = JSON.parse(
    fs.readFileSync(path.join(originModuleDir, "meta.json"), "utf8")
  );
  const targetModuleDir = path.join(demoDir, meta.root);

  const getDeps = (packageJSON) => {
    const packages = [];
    if (Object.prototype.hasOwnProperty.call(packageJSON, "x-dependencies")) {
      const deps = packageJSON["x-dependencies"];
      for (const [key, value] of Object.entries(deps)) {
        packages.push(`${key}@${value}`);
      }
    }
    return packages;
  };

  // cleanup node_modules
  if (existsSync(path.join(originModuleDir, "node_modules"))) {
    fs.rmdirSync(path.join(originModuleDir, "node_modules"), {
      recursive: true
    });
  }
  if (existsSync(path.join(originModuleDir, "yarn.lock"))) {
    fs.rmdirSync(path.join(originModuleDir, "yarn.lock"), { recursive: true });
  }

  copy(originModuleDir, targetModuleDir);

  find.file(originModuleDir, function (files) {
    files.forEach((file) => {
      if (path.basename(file) === "package.json") {
        const packageJSON = JSON.parse(fs.readFileSync(file, "utf8"));
        const yarnPath = path.join(
          "file:.",
          meta.root,
          path.dirname(file).replace(originModuleDir, "")
        );
        const packages = [yarnPath, ...getDeps(packageJSON)].join(" ");

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
