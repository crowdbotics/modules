import fs from "fs";
import path from "path";
import config from "./config.js";

const DJANGO_MODULES = path.join("modules", "django");
const REACT_NATIVE_MODULES = path.join("modules", "react-native");
const OUTPUT_FILE = path.join(config.dist.directory, "modules.json");
const ACCEPTED_EXTENSIONS = [".json", ".js", ".ts", ".jsx", ".tsx", ".md", ".py"];

const parseModules = dir => {
  const parseModule = moduleDir => {
    let entries = fs.readdirSync(moduleDir);
    entries.map(entry => {
      let entryPath = path.join(moduleDir, entry)
      let stats = fs.statSync(entryPath);
      if (stats.isDirectory()) {
        parseModule(entryPath);
      } else {
        if (ACCEPTED_EXTENSIONS.includes(path.extname(entryPath))) {
          data[entryPath] = fs.readFileSync(entryPath, "utf8");
        }
      }
    });

  }

  let data = {};
  let modules = fs.readdirSync(dir);

  modules.map(module => {
    parseModule(path.join(dir, module))
  });

  return data;
}

const parseData = ({
  dir,
  file,
  parentDir,
  newFile = true,
  multiDirectory = false
}) => {
  let map = JSON.parse(fs.readFileSync(file, "utf8"));
  let data = parseModules(dir);
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

parseData({
  dir: REACT_NATIVE_MODULES,
  file: OUTPUT_FILE,
  parentDir: "/modules"
});
parseData({
  dir: DJANGO_MODULES,
  file: OUTPUT_FILE,
  parentDir: "/backend/modules",
  multiDirectory: true
});
