import fs, { existsSync } from "fs";
import path from "path";
import find from "find";
import { execSync } from "child_process";

export function removeModules(modules, source, dir, gitRoot) {
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

    const filterPackageJSON = (src, _) => path.basename(src) === "package.json";
    const filterMeta = (src, _) => path.basename(src) !== "meta.json";

    // cleanup node_modules
    if (existsSync(path.join(originModuleDir, "node_modules"))) {
      fs.rmSync(path.join(originModuleDir, "node_modules"), {
        recursive: true
      });
    }
    if (existsSync(path.join(targetModuleDir, "node_modules"))) {
      fs.rmSync(path.join(targetModuleDir, "node_modules"), {
        recursive: true
      });
    }

    find.file(originModuleDir, function (files) {
      const file = files.filter(filterPackageJSON)[0];
      if (file) {
        const packageJSON = JSON.parse(fs.readFileSync(file, "utf8"));
        const name = packageJSON.name;
        process.chdir(dir);

        try {
          execSync(`yarn remove ${name}`);
        } catch (err) {
          console.warn("Failed removing module. Is this module installed?");
          return;
        }
      }

      files.filter(filterMeta).forEach((file) => {
        const targetFilePath = path.join(
          targetModuleDir,
          path.relative(originModuleDir, file)
        );

        fs.rmSync(targetFilePath);

        const dir = path.dirname(targetFilePath);
        const files = fs.readdirSync(dir);
        if (files.length === 0) {
          fs.rmSync(dir, { recursive: true });
        }
      });
    });
  });
}
