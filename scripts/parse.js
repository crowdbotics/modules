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
const META_FILE = ["meta.json"];

const parseModules = (dir) => {
  const valid = (message) => {
    console.log(`${message} \u2705`);
  };

  const invalid = (message) => {
    console.log(`${message} \u274C`);
  };

  const accepted = (str) => {
    return ACCEPTED_EXTENSIONS.includes(path.extname(str));
  };

  const meta = (str) => {
    return path.basename(str) == META_FILE;
  };

  const checksum = (str) =>
    crypto.createHash("md5").update(str, "utf8").digest("hex");

  const parseModule = (moduleDir, callback) => {
    let entries = fs.readdirSync(moduleDir);
    entries.map((entry) => {
      let entryPath = path.join(moduleDir, entry);
      let stats = fs.statSync(entryPath);
      if (stats.isDirectory()) {
        parseModule(entryPath, callback);
      } else if (accepted(entryPath)) {
        let filePath = path.join(...entryPath.split("/").splice(2));
        let content = fs.readFileSync(entryPath, "utf8");
        callback(filePath, content, meta(entryPath));
      }
    });
  };

  let data = {};
  let modules = fs.readdirSync(dir);
  console.log("");
  console.log("Parsing modules...", "\n");
  modules.map((module) => {
    let hasMeta = false;
    let modulePath = path.join(dir, module);
    data[module] = {
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
    // cleanup node_modules
    fs.rmdirSync(path.join(modulePath, "node_modules"), {
      recursive: true,
    });
    fs.rmdirSync(path.join(modulePath, "yarn.lock"), { recursive: true });
    parseModule(modulePath, (filePath, content, meta = false) => {
      if (meta) {
        hasMeta = true;
        data[module].meta = Object.assign(
          data[module].meta,
          JSON.parse(content)
        );
      } else {
        data[module].files[filePath] = content;
      }
      data[module].meta.checksum = checksum(JSON.stringify(data[module]));
    });

    // Validations
    let isValid = true;
    console.log("=>", module);

    let { meta } = data[module];

    if (!hasMeta) {
      isValid = false;
      invalid("meta.json is missing");
    } else {
      if (!meta.root) {
        isValid = false;
        invalid("meta's root property is missing");
      }
    }
    if (isValid) {
      valid("module passes all checks");
    }
  });
  console.log("");
  console.log("Total of modules:", Object.keys(data).length);
  return data;
};

let data = parseModules(MODULES_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
