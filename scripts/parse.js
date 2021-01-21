import fs from "fs";
import path from "path";

let data;
const DJANGO_MODULES = path.join("django");
const DJANGO_OUTPUT_FILE = "django.json";
const REACT_NATIVE_MODULES = path.join("react-native");
const REACT_NATIVE_OUTPUT_FILE = "react-native.json";
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

const parseData = ({ data, file, parentDir = null, newFile = true }) => {
  let map = {};
  Object.keys(data).map(key => {
    let paths = key.split("/");
    let base = paths.splice(0, 2);
    let file = paths.join("/");
    if (!map.hasOwnProperty(base[1])) {
      map[base[1]] = {};
    }
    Object.assign(map[base[1]], {
      [file]: {
        code: data[key],
        parentDir: parentDir,
        newFile: newFile
      }
    });
  })
  fs.writeFileSync(file, JSON.stringify(map, null, 2));
}

data = {};
parseModules(REACT_NATIVE_MODULES);
parseData({ data: data, file: REACT_NATIVE_OUTPUT_FILE });
data = {};
parseModules(DJANGO_MODULES);
parseData({ data: data, file: DJANGO_OUTPUT_FILE, parentDir: "/" });
