import fs from "fs";
import path from "path";
import config from "./config.js";

let data;
const DJANGO_MODULES = path.join("modules", "django");
const DJANGO_OUTPUT_FILE = path.join(config.dist.directory, "django.json");
const REACT_NATIVE_MODULES = path.join("modules", "react-native");
const REACT_NATIVE_OUTPUT_FILE = path.join(config.dist.directory, "react-native.json");
const ACCEPTED_EXTENSIONS = [".json", ".js", ".ts", ".jsx", ".tsx", ".md", ".py"];

const parseDir = dir => {
  let entries = fs.readdirSync(dir);
  entries.map(entry => {
    let entryPath = path.join(dir, entry)
    let stats = fs.statSync(entryPath);
    if (stats.isDirectory()) {
      parseDir(entryPath);
    } else {
      if (ACCEPTED_EXTENSIONS.includes(path.extname(entryPath))) {
        data[entryPath] = fs.readFileSync(entryPath, "utf8");
      }
    }
  });
}

const parseModules = dir => {
  let modules = fs.readdirSync(dir);
  modules.map(module => {
    parseDir(path.join(dir, module));
  })
}

const parseData = ({
  data,
  file,
  parentDir,
  newFile = true,
  multiDirectory = false
}) => {
  let map = {};
  Object.keys(data).map(key => {
    let paths = key.split("/");
    let base = paths.splice(0, 2);
    let module = paths[0];
    if (multiDirectory) {
      paths.splice(0, 1);
    }
    let file = paths.join("/");
    if (!map.hasOwnProperty(base[1])) {
      map[base[1]] = {};
    }
    if (!map[base[1]].hasOwnProperty(module)) {
      map[base[1]][module] = {};
    }
    map[base[1]][module][file] = {
      code: data[key],
      parentDir: parentDir,
      newFile: newFile
    }
  })
  fs.writeFileSync(file, JSON.stringify(map, null, 2));
}

data = {};
parseModules(REACT_NATIVE_MODULES);
parseData({
  data: data,
  file: REACT_NATIVE_OUTPUT_FILE,
  parentDir: "/modules"
});
data = {};
parseModules(DJANGO_MODULES);
parseData({
  data: data,
  file: DJANGO_OUTPUT_FILE,
  parentDir: "/backend/modules",
  multiDirectory: true
});
