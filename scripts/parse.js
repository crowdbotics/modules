import fs from "fs";
import path from "path";
import config from "./config.js";
import crypto from "crypto";

const MODULES_DIR = path.join("modules");
const OUTPUT_FILE = path.join(config.dist.directory, "modules.json");
const ACCEPTED_EXTENSIONS = [
  ".json",
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".md",
  ".py",
];
const BASE_64_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const META_FILE = ["meta.json"];
const PREVIEW_FILE = ["preview.png"];

const parseModules = (dir) => {
  const valid = (message) => {
    console.log(`${message} \u2705`);
  };

  const invalid = (message) => {
    console.log(`${message} \u274C`);
  };

  const accepted = (entry) => {
    return ACCEPTED_EXTENSIONS.includes(path.extname(entry));
  };

  const base64 = (entry) => {
    return BASE_64_EXTENSIONS.includes(path.extname(entry));
  };

  const checksum = (str) =>
    crypto.createHash("md5").update(str, "utf8").digest("hex");

  const moduleDefaults = (module) => {
    return {
      meta: {
        title: module,
        description: "",
        slug: module,
        options: { x: 0, y: 0, domTree: "" },
        setup:
          "To properly configure this module, follow the instructions given in README.md inside the module folder.",
      },
      files: {},
    };
  };

  const ignoreRootDirs = (entry, num) => {
    return path.join(...entry.split("/").splice(num));
  };

  const parseModule = (moduleDir, callback) => {
    let entries = fs.readdirSync(moduleDir);
    entries.map((entry) => {
      let entryPath = path.join(moduleDir, entry);
      let stats = fs.statSync(entryPath);
      if (stats.isDirectory()) {
        parseModule(entryPath, callback);
      } else if (accepted(entryPath)) {
        let content = fs.readFileSync(entryPath, "utf8");
        let filePath = ignoreRootDirs(entryPath, 2);
        callback(filePath, content);
      } else if (base64(entryPath)) {
        let ext = path.extname(entryPath).replace(".", "");
        let content = `data:image/${ext};base64,${fs.readFileSync(
          entryPath,
          "base64"
        )}`;
        let filePath = ignoreRootDirs(entryPath, 2);
        callback(filePath, content);
      }
    });
  };

  let data = {};
  let modules = fs.readdirSync(dir);
  console.log("");
  console.log("Parsing modules...", "\n");

  modules.map((module) => {
    console.log("=>", module);
    let modulePath = path.join(dir, module);
    data[module] = moduleDefaults(module);

    // cleanup node_modules
    fs.rmdirSync(path.join(modulePath, "node_modules"), {
      recursive: true,
    });
    fs.rmdirSync(path.join(modulePath, "yarn.lock"), { recursive: true });

    parseModule(modulePath, (filePath, content) => {
      data[module].files[filePath] = content;
    });

    // Parse module metadata
    const meta = JSON.parse(data[module].files[META_FILE]);
    delete data[module].files[META_FILE];

    if (!meta) {
      invalid("meta.json is missing");
      return;
    } else if (!meta.root) {
      invalid("meta's root property is missing");
      return;
    }

    data[module].meta = Object.assign(data[module].meta, meta);
    data[module].meta.checksum = checksum(JSON.stringify(data[module]));

    // Parse module preview image
    const preview = data[module].files[PREVIEW_FILE];
    delete data[module].files[PREVIEW_FILE];

    if (!preview) {
      invalid("module preview image missing");
      return;
    }

    data[module].meta.preview = preview;

    valid("module passes all checks");
  });
  console.log("");
  console.log("Total of modules:", Object.keys(data).length);
  return data;
};

let data = parseModules(MODULES_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
