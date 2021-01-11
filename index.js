import fs from "fs";
import path from "path";

const MODULES_DIR = path.join("react-native");
const OUTPUT_FILE = "data.json";

let data = {};

const parseDir = dir => {
  let entries = fs.readdirSync(dir);
  entries.map(entry => {
    let entryPath = path.join(dir, entry)
    let stats = fs.statSync(entryPath);
    if (stats.isDirectory()) {
      parseDir(entryPath);
    } else {
      data[entryPath] = fs.readFileSync(entryPath, "utf8");
    }
  });
}

const parseModules = dir => {
  let modules = fs.readdirSync(dir);
  modules.map(module => {
    parseDir(path.join(dir, module));
  })
}

const parseData = data => {
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
        parentDir: null,
        newFile: true
      }
    });
  })
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(map, null, 2));
}

parseModules(MODULES_DIR);
parseData(data);
