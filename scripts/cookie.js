import fs from "fs";
import path from "path";
import fse from "fs-extra";
import config from "./config.js";
// https://github.com/react-native-community/cli/blob/22a3c2558c2e03cc61f088807d2b09d1567c07ca/packages/cli/src/commands/init/editTemplate.ts#L77
import edit from "../node_modules/@react-native-community/cli/build/commands/init/editTemplate.js";
const replace = edit.changePlaceholderInTemplate;

const source = path.join(process.cwd(), config.dist.builds.raw.directory);
const target = path.join(process.cwd(), config.dist.builds.cookie.directory);

if (fs.existsSync(target)) {
  fs.rmdirSync(target, { recursive: true });
}

const rawNodeModules = path.join(
  source,
  config.dist.builds.raw.placeholderName,
  "node_modules"
);

if (fs.existsSync(rawNodeModules)) {
  fs.rmdirSync(rawNodeModules, { recursive: true });
}

fse.copySync(source, target);
process.chdir(target);
fs.renameSync(
  path.join(config.dist.builds.raw.placeholderName),
  "{{cookiecutter.project_slug}}",
  { recursive: true }
);

replace({
  projectName: "{{cookiecutter.project_dash_slug}}",
  projectTitle: "{{cookiecutter.project_dash_slug}}",
  placeholderName: "ProjectNameIdentifier",
  placeholderTitle: config.dist.builds.raw.titlePlaceholder
});

replace({
  projectName: "{{cookiecutter.project_slug}}",
  projectTitle: "{{cookiecutter.project_slug}}",
  placeholderName: config.dist.builds.raw.placeholderName,
  placeholderTitle: config.dist.builds.raw.titlePlaceholder
});

replace({
  projectName: "{{cookiecutter.project_dash_slug}}",
  projectTitle: "{{cookiecutter.project_dash_slug}}",
  placeholderName: config.dist.builds.raw.placeholderName.toLowerCase(),
  placeholderTitle: config.dist.builds.raw.titlePlaceholder.toLowerCase()
});

replace({
  projectName: "{{cookiecutter.owner_email}}",
  projectTitle: "{{cookiecutter.project_dash_slug}}",
  placeholderName: "ProjectOwnerEmail",
  placeholderTitle: config.dist.builds.raw.titlePlaceholder
});

replace({
  projectName: "{{cookiecutter.ssh_key_fingerprint}}",
  projectTitle: "{{cookiecutter.project_dash_slug}}",
  placeholderName: "ProjectSSHKeyFingerPrint",
  placeholderTitle: config.dist.builds.raw.titlePlaceholder
});

fs.writeFileSync(
  path.join(target, "cookiecutter.json"),
  JSON.stringify(config.dist.builds.cookie.config, null, 2)
);
