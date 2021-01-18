import path from "path";
import {
  ManifestTransformer,
  execShellCommand,
  read,
  generate,
  pretty,
  write,
  parse
} from "./utils.js";

const module = process.argv.slice(2)[0];
const demoDir = path.join(process.cwd(), "demo");

const originModuleDir = path.join(process.cwd(), "react-native", module);
const targetModuleDir = path.join(demoDir, "src", "modules");
const moduleName = `@modules/${module}`;

let packages = [moduleName];

// Remove x-dependencies
const packageJSON = JSON.parse(
  read(path.join(originModuleDir, "package.json"))
);
if (packageJSON.hasOwnProperty("x-dependencies")) {
  const deps = packageJSON["x-dependencies"];
  for (const [key, _] of Object.entries(deps)) {
    packages.push(`${key}`);
  }
}

// Remove packages
packages = packages.join(" ");
execShellCommand(`cd ${demoDir} && yarn remove ${packages}`);
const rmDir = path.join(targetModuleDir, module);
execShellCommand(`rm -rf ${rmDir}`)

// Update manifest
const manifest = path.join(targetModuleDir, "manifest.js");
let code = read(manifest);
const transformer = new ManifestTransformer({ add: false, module: module });
let node = parse(code);
node = transformer.visit(node);
code = pretty(generate(node));
write(manifest, code);
