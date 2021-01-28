import path from "path";
import { clean, remove, write, rename } from "./utils.js";
// https://github.com/react-native-community/cli/blob/22a3c2558c2e03cc61f088807d2b09d1567c07ca/packages/cli/src/commands/init/editTemplate.ts#L77
import config from "../template/template.config.js";
import edit from "../node_modules/@react-native-community/cli/build/commands/init/editTemplate.js";
const replace = edit.changePlaceholderInTemplate;
import ncp from "ncp";
ncp.limit = 16;

const COOKIECUTTER_DIRECTORY = "cookiecutter";
const source = path.join(process.cwd(), "template");
const target = path.join(process.cwd(), COOKIECUTTER_DIRECTORY);

// cookiecutter.json content
const COOKIECUTTER_JSON = {
  "project_name": "",
  "project_slug": "{{cookiecutter.project_name|lower|replace(' ', '')|replace('-', '_')}}",
  "project_dash_slug": "{{cookiecutter.project_slug|replace('_', '-')}}",
  "owner_email": "",
  "ssh_key_fingerprint": ""
};

const callback = (err) => {
  if (err) {
    return console.error(err);
  }
  // Change to the cookiecutter directory first because replace uses process.cwd()
  process.chdir("cookiecutter");

  replace({
    projectName: "{{cookiecutter.project_slug}}",
    projectTitle: "{{cookiecutter.project_slug}}",
    placeholderName: config.placeholderName,
    placeholderTitle: config.titlePlaceholder
  });

  replace({
    projectName: "{{cookiecutter.project_dash_slug}}",
    projectTitle: "{{cookiecutter.project_dash_slug}}",
    placeholderName: config.placeholderName.toLowerCase(),
    placeholderTitle: config.titlePlaceholder.toLowerCase()
  });

  replace({
    projectName: "{{cookiecutter.project_dash_slug}}",
    projectTitle: "{{cookiecutter.project_dash_slug}}",
    placeholderName: "ProjectNameIdentifier",
    placeholderTitle: config.titlePlaceholder
  });

  replace({
    projectName: "{{cookiecutter.project_owner_email}}",
    projectTitle: "{{cookiecutter.project_dash_slug}}",
    placeholderName: "ProjectOwnerEmail",
    placeholderTitle: config.titlePlaceholder
  });

  replace({
    projectName: "{{cookiecutter.ssh_key_fingerprint}}",
    projectTitle: "{{cookiecutter.project_dash_slug}}",
    placeholderName: "ProjectSSHKeyFingerPrint",
    placeholderTitle: config.titlePlaceholder
  });

  const cwd = process.cwd()
  remove(path.join(cwd, "package.json"));
  remove(path.join(cwd, "script.js"));
  remove(path.join(cwd, "template.config.js"));
  write(path.join(cwd, "cookiecutter.json"), JSON.stringify(COOKIECUTTER_JSON));
  rename(path.join(cwd, "source"), path.join(cwd, "{{cookiecutter.project_slug}}"));
}

clean({ target: COOKIECUTTER_DIRECTORY });
ncp(source, target, err => callback(err));
