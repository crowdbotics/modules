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

const getPkgJsonDeps = (pkgJson) => {
  const packages = [];
  if (Object.prototype.hasOwnProperty.call(pkgJson, "x-dependencies")) {
    const deps = pkgJson["x-dependencies"];
    for (const [key, value] of Object.entries(deps)) {
      packages.push(`${key}@${value}`);
    }
  }
  return packages;
};

function installPipPackage(file, moduleDir, appDir, metaRoot) {
  const packagePath = path
    .join(metaRoot, path.dirname(file).replace(moduleDir, ""))
    .replace(/^\/backend/, "");

  process.chdir(path.join(appDir, "backend"));
  const command = `pipenv install -e ./${packagePath}`;
  try {
    execSync(command);
  } catch (err) {
    console.warn("Failed installing module with:", command);
  }
}

function installNpmPackage(file, moduleDir, appDir, metaRoot) {
  const pkgJson = JSON.parse(fs.readFileSync(file, "utf8"));
  const yarnPath = path.join(
    "file:.",
    metaRoot,
    path.dirname(file).replace(moduleDir, "")
  );
  const packages = [yarnPath, ...getPkgJsonDeps(pkgJson)].join(" ");

  process.chdir(appDir);
  const command = `yarn add ${packages}`;
  try {
    execSync(command);
  } catch (err) {
    console.warn("Failed adding module with:", command);
  }
}

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
        if (
          path.basename(file) === "setup.py" &&
          fs.existsSync(path.join(path.dirname(file), "pyproject.toml"))
        ) {
          installPipPackage(file, originModuleDir, dir, meta.root);
        }
        if (path.basename(file) === "package.json") {
          installNpmPackage(file, originModuleDir, dir, meta.root);
        }
      });
    });
  });
}
