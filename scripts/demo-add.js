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
const yarnPath = path.join("file:./src", "modules", module);

let packages = [yarnPath];
execShellCommand(`cp -r ${originModuleDir} ${targetModuleDir}`);

// Install x-dependencies
const packageJSON = JSON.parse(
  read(path.join(originModuleDir, "package.json"))
);
if (packageJSON.hasOwnProperty("x-dependencies")) {
  const deps = packageJSON["x-dependencies"];
  for (const [key, value] of Object.entries(deps)) {
    packages.push(`${key}@${value}`);
  }
}

// Install packages
packages = packages.join(" ");
// TODO -- add process.chdir
execShellCommand(`cd ${demoDir} && yarn add ${packages}`);

// Update manifest
const manifest = path.join(targetModuleDir, "manifest.js");
let code = read(manifest);
const transformer = new ManifestTransformer({ add: true, module: module });
let node = parse(code);
node = transformer.visit(node);
code = pretty(generate(node));
write(manifest, code);
