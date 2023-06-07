import fs from "fs";
import path from "path";
import fse from "fs-extra";
import config from "./config.js";

const cwd = process.cwd();

const template = path.join(cwd, config.scaffold.directory, "template");
const custom = path.join(template, "custom");
const parent = path.dirname(template);

fse.ensureDir(template);
fse.ensureDir(custom);
fse.renameSync(custom, path.join(parent, "custom"));
fs.rmdirSync(template, { recursive: true });
fse.copySync(
  path.join(cwd, "node_modules", "react-native", "template"),
  template
);
fse.renameSync(path.join(parent, "custom"), custom);
