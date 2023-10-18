import fs, { existsSync } from "fs";
import path from "path";
import crypto from "crypto";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { valid, invalid, section } from "../utils.js";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const ACCEPTED_EXTENSIONS = [
  ".json",
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".md",
  ".py",
  ".toml"
];
const BASE_64_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const META_FILE = ["meta.json"];
const PREVIEW_FILE = ["preview.png"];

export const parseModules = (dir) => {
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
          "To properly configure this module, follow the instructions given in README.md inside the module folder."
      },
      files: {}
    };
  };

  const ignoreRootDirs = (entry, num) => {
    return path.join(...entry.split("/").splice(num));
  };

  const parseModule = (moduleDir, callback) => {
    const entries = fs.readdirSync(moduleDir);
    entries.forEach((entry) => {
      const entryPath = path.join(moduleDir, entry);
      const stats = fs.statSync(entryPath);
      if (stats.isDirectory()) {
        parseModule(entryPath, callback);
      } else if (accepted(entryPath)) {
        const content = fs.readFileSync(entryPath, "utf8");
        const filePath = ignoreRootDirs(entryPath, 2);
        callback(filePath, content);
      } else if (base64(entryPath)) {
        const ext = path.extname(entryPath).replace(".", "");
        const content = `data:image/${ext};base64,${fs.readFileSync(
          entryPath,
          "base64"
        )}`;
        const filePath = ignoreRootDirs(entryPath, 2);
        callback(filePath, content);
      }
    });
  };

  const data = {};
  const modules = fs.readdirSync(dir);
  section("Parsing modules...", "\n");

  modules.forEach((module) => {
    const modulePath = path.join(dir, module);
    data[module] = moduleDefaults(module);

    // cleanup node_modules
    if (existsSync(path.join(modulePath, "node_modules"))) {
      fs.rmSync(path.join(modulePath, "node_modules"), {
        recursive: true
      });
    }
    if (existsSync(path.join(modulePath, "yarn.lock"))) {
      fs.rmSync(path.join(modulePath, "yarn.lock"));
    }

    parseModule(modulePath, (filePath, content) => {
      data[module].files[filePath] = content;
    });

    // Parse module metadata
    const meta = JSON.parse(data[module].files[META_FILE]);
    delete data[module].files[META_FILE];

    if (!meta) {
      invalid(module, "meta.json is missing");
      return;
    } else if (!meta.root) {
      invalid(module, "meta's root property is missing");
      return;
    }

    // Validate screen only modules
    if (module.split("-")[0].startsWith("screen")) {
      if (path.dirname(meta.root) !== "/screens") {
        invalid(module, "screen modules must have root starting with /screens");
      }

      const pkg = JSON.parse(data[module].files["package.json"]);

      if (pkg.dependencies && Object.entries(pkg.dependencies).length) {
        invalid(module, "screen modules must not have dependencies");
        return;
      }

      if (!pkg.name.startsWith("@screens")) {
        invalid(
          module,
          `screen modules name must start with @screens - got ${pkg.name}`
        );
        return;
      }

      if (!data[module].files["index.js"].includes("export default")) {
        invalid(module, "screen module with missing export default");
        return;
      }
    }

    // Validate module options JSON Schema
    if (meta.schema) {
      const schema = {
        type: "object",
        properties: meta.schema
      };
      ajv.compile(schema);
      meta.schema = schema;
    }

    data[module].meta = Object.assign(data[module].meta, meta);
    data[module].meta.checksum = checksum(JSON.stringify(data[module]));

    // Parse module preview image
    const preview = data[module].files[PREVIEW_FILE];
    delete data[module].files[PREVIEW_FILE];

    if (!preview) {
      invalid(module, "module preview image missing");
      return;
    }

    data[module].meta.preview = preview;

    valid(module);
  });
  section("Total of modules:", Object.keys(data).length);
  return data;
};
