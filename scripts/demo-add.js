import path from "path";
import { execShellCommand } from "./utils.js";

const module = process.argv.slice(2)[0];
const demoDir = path.join(process.cwd(), "demo");

const originModuleDir = path.join(process.cwd(), "react-native", module);
const targetModuleDir = path.join(demoDir, "src", "modules");
const yarnPath = path.join("file:./src", "modules", module);

execShellCommand(`cp -r ${originModuleDir} ${targetModuleDir}`)
execShellCommand(`cd ${demoDir} && yarn add ${yarnPath}`);
