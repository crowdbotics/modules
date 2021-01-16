import path from "path";
import { execShellCommand } from "./utils.js";

const module = process.argv.slice(2)[0];
const demoDir = path.join(process.cwd(), "demo");

const targetModuleDir = path.join(demoDir, "src", "modules", module);
const moduleName = `@modules/${module}`;

execShellCommand(`rm -rf ${targetModuleDir}`)
execShellCommand(`cd ${demoDir} && yarn remove ${moduleName}`);
