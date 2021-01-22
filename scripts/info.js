import path from "path";
import { read } from "./utils.js";

const REACT_NATIVE_OUTPUT_FILE = "react-native.json";

const module = process.argv.slice(2)[0];
const dataFile = path.join(process.cwd(), REACT_NATIVE_OUTPUT_FILE);
const moduleDir = path.join(process.cwd(), "react-native", module);

let data = JSON.parse(read(dataFile));
let packageJSON = JSON.parse(read(path.join(moduleDir, "package.json")));

console.log(packageJSON.name);
console.log(packageJSON.description);
console.log("\n");
console.log(JSON.stringify(data[module]));
