import fs, { existsSync } from "fs";
import fse from "fs-extra";
import path from "path";
import find from "find";
import { execSync } from "child_process";

const IGNORED_ENTRIES = ["meta.json", "node_modules"];

const filterFiles = (src, _) => !IGNORED_ENTRIES.includes(path.basename(src));

const copy = (origin, target) => {
  fs.mkdirSync(target, { recursive: true });
  fse.copySync(origin, target, { filter: filterFiles });
};

export function addModules(modules, source, dir, gitRoot) {
  const cwd = process.cwd();

  if (source) {
    source = path.join(cwd, source);
  } else {
    source = path.join(gitRoot, "modules");
  }

  if (dir) {
    dir = path.join(cwd, dir);
  } else {
    dir = path.join(gitRoot, "demo");
  }

  modules.forEach((module) => {
    process.chdir(gitRoot);
    const originModuleDir = path.join(source, module);
    const meta = JSON.parse(
      fs.readFileSync(path.join(originModuleDir, "meta.json"), "utf8")
    );
    const targetModuleDir = path.join(dir, meta.root);

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
      fs.rmSync(path.join(originModuleDir, "node_modules"), {
        recursive: true
      });
    }
    if (existsSync(path.join(originModuleDir, "yarn.lock"))) {
      fs.rmSync(path.join(originModuleDir, "yarn.lock"));
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

          process.chdir(dir);
          try {
            execSync(`yarn add ${packages}`);
          } catch (err) {
            console.warn("Failed adding module. Is this module available?");
          }
        }
      });
    });
  });
}
