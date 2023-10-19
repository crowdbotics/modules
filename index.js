#!/usr/bin/env node
/**
 * Crowdbotics Modules tool
 *
 * Run it anywhere with: npx crowdbotics/modules
 *
 * Commands available:
 * - parse
 * - demo
 * - add
 * - remove
 * - create
 * - commit
 * - init
 * - upgrade
 * - help
 */
import arg from "arg";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { parseModules } from "./scripts/parse.js";
import { createDemo } from "./scripts/demo.js";
import { addModules } from "./scripts/add.js";
import { removeModules } from "./scripts/remove.js";
import { commitModules } from "./scripts/commit-module.js";
import { upgradeScaffold } from "./scripts/upgrade.js";
import { valid, invalid } from "./utils.js";
import { createModule } from "./scripts/create.js";

function dispatcher() {
  const command = process.argv[2];

  if (!command) {
    return commands.help();
  }

  if (!Object.prototype.hasOwnProperty.call(commands, command)) {
    invalid(`command doesn't exist: ${command}`);
  }

  return commands[command]();
}

const commands = {
  demo: () => {
    createDemo(
      "demo",
      path.join(
        path.dirname(path.dirname(process.argv[1])),
        "modules",
        "cookiecutter.yaml"
      )
    );
    valid("demo app successfully generated");
  },
  parse: () => {
    const args = arg({
      "--source": String,
      "--write": String
    });

    if (!args["--source"]) {
      invalid("missing required argument: --source");
    }

    const data = parseModules(path.join(args["--source"]));
    if (args["--write"] && process.exitCode !== 1) {
      fs.mkdirSync(path.dirname(path.join(args["--write"])), {
        recursive: true
      });
      fs.writeFileSync(
        path.join(args["--write"]),
        JSON.stringify(data, null, 2),
        "utf8"
      );
    }
  },
  add: () => {
    const args = arg({
      "--source": String,
      "--project": String
    });
    const modules = args._.slice(1);
    if (!modules.length) {
      invalid("please provide the name of the modules to be installed");
    }
    addModules(modules, args["--source"], args["--project"]);
  },
  remove: () => {
    const args = arg({
      "--source": String,
      "--project": String
    });
    const modules = args._.slice(1);
    if (!modules.length) {
      invalid("please provide the name of the modules to be removed");
    }
    removeModules(modules, args["--source"], args["--project"]);
  },
  create: () => {
    const args = arg({
      "--name": String,
      "--type": String,
      "--target": String
    });
    if (!args["--name"]) {
      invalid("missing required argument: --name");
    }
    if (!args["--type"]) {
      invalid("missing required argument: --type");
    }
    createModule(args["--name"], args["--type"], args["--target"]);
  },
  commit: () => {
    const args = arg({});
    const modules = args._.slice(1);
    if (!modules.length) {
      invalid("please provide the name of the modules to be commited");
    }
    commitModules(modules, "demo");
  },
  init: () => {
    const args = arg({
      "--name": String
    });
    if (!args["--name"]) {
      invalid("missing required argument: --name");
    }
    const baseDir = path.join(process.cwd(), args["--name"]);
    const git = spawnSync("git init", [args["--name"]], {
      cwd: process.cwd(),
      shell: true
    });
    if (git.error) {
      invalid("git init failed", git.stderr);
    }
    const gitignore = `logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
node_modules/
.npm
.DS_Store
.idea
demo`;
    fs.mkdirSync(path.join(baseDir, "modules"));
    fs.writeFileSync(path.join(baseDir, ".gitignore"), gitignore, "utf8");
    fs.writeFileSync(path.join(baseDir, "modules", ".keep"), "", "utf8");
    spawnSync("git add .gitignore modules", [], {
      cwd: baseDir,
      shell: true
    });
    spawnSync("git commit -m 'Initial commit'", [], {
      cwd: baseDir,
      shell: true
    });
  },
  upgrade: () => {
    const args = arg({
      "--version": String
    });
    upgradeScaffold(args["--version"]);
  },
  help: () => {
    console.log(`usage: npx crowdbotics/modules <command>

Commands available:
  parse    Parse and validate your modules
  demo     Generate a local React Native and Django demo app
  add      Install a module in the demo app
  remove   Remove a module from the demo app
  create   Create a new module of a given type
  commit   Update an existing module from the demo source code
  init     Initialize a blank modules repository
  upgrade  Upgrade your existing app's scaffold to the latest version
  help     Show this help page

Parse and validate your modules:
  npx crowdbotics/modules parse --source <path>

Parse modules and write the data to a json file:
  npx crowdbotics/modules parse --source <path> --write <path>

Create a demo app:
  npx crowdbotics/modules demo

Create a module of a given type:
  npx crowdbotics/modules create --name <module-name> --type <all/react-native/django>

Initialize a modules repository:
  npx crowdbotics/modules init --name <my-modules-repository-name>

Upgrade your scaffold to the latest master:
  npx crowdbotics/modules upgrade

Upgrade your scaffold to a specific version (git tag, git commit or branch name):
  npx crowdbotics/modules upgrade --version 2.3.0

Install one or modules to your demo app:
  npx crowdbotics/modules add <module-name> <module-name-2>

Remove one or modules from your demo app:
  npx crowdbotics/modules remove <module-name> <module-name-2>

Install modules from other directory:
  npx crowdbotics/modules add --source ../other-repository <module-name>

Install modules to other app that is not "demo":
  npx crowdbotics/modules add --project ../other-project <module-name>

Remove modules from app that is not "demo":
  npx crowdbotics/modules remove --project ../other-project <module-name>

Update a module definition from the demo app:
  npx crowdbotics/modules commit <module-name>

Glossary:
  <module-name> stands for the name of the directory where the module is defined.
`);
  }
};

try {
  dispatcher();
} catch (err) {
  invalid(err.message);
}
