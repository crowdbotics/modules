import fs from "fs";
import path from "path";
import config from "./config.js";

const REACT_NATIVE_OUTPUT_FILE = path.join(config.dist.directory, "react-native.json");

const module = process.argv.slice(2)[0];
const dataFile = path.join(process.cwd(), REACT_NATIVE_OUTPUT_FILE);
const moduleDir = path.join(process.cwd(), "modules", "react-native", module);

let data = JSON.parse(
  fs.readFileSync(dataFile, "utf8")
);
let packageJSON = JSON.parse(
  fs.readFileSync(path.join(moduleDir, "package.json"), "utf8")
);

console.log("Package:");
console.log(packageJSON.name);
console.log(packageJSON.description);
console.log("");
console.log("App types:");
console.log("3");
console.log("");
console.log("Check 'Auto build' and 'Is verified'");
console.log("");
console.log("Options:");
console.log("{ \"x\": 0, \"y\": 0, \"domTree\": \"\" }");
console.log("");
console.log("Code:");
console.log(JSON.stringify(data["react-native"][module]));
console.log("");
console.log("Setup step:");
console.log("To properly configure this module, follow the instructions given in README.md inside the module folder.");
