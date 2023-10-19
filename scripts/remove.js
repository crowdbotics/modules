import fs, { existsSync } from "fs";
import path from "path";
import find from "find";
import { execSync } from "child_process";

export function removeModules(modules, source = "modules", dir = "demo") {
  const cwd = process.cwd();
  const demoDir = path.join(process.cwd(), dir);

  modules.forEach((module) => {
    process.chdir(cwd);
    const originModuleDir = path.join(process.cwd(), source, module);
    const meta = JSON.parse(
      fs.readFileSync(path.join(originModuleDir, "meta.json"), "utf8")
    );
    const targetModuleDir = path.join(demoDir, meta.root);

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
        process.chdir(demoDir);

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
