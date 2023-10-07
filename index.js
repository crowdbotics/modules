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
 * - commit
 * - upgrade
 * - help
 */
import arg from "arg";
import fs from "node:fs";
import path from "node:path";
import { parseModules } from "./scripts/parse.js";
import { createDemo } from "./scripts/demo.js";
import { addModules } from "./scripts/add.js";
import { removeModules } from "./scripts/remove.js";
import { commitModules } from "./scripts/commit-module.js";
import { upgradeScaffold } from "./scripts/upgrade.js";
import { valid, invalid } from "./utils.js";

function dispatcher() {
  const command = process.argv[2];

  if (!Object.prototype.hasOwnProperty.call(commands, command)) {
    invalid(`command doesn't exist: ${command}`);
  }

  commands[command]();
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
      fs.writeFileSync(
        path.join(args["--write"]),
        JSON.stringify(data, null, 2),
        "utf8"
      );
    }
  },
  add: () => {
    const args = arg({});
    const modules = args._.slice(1);
    if (!modules.length) {
      invalid("please provide the name of the modules to be installed");
    }
    addModules(modules, "demo");
  },
  remove: () => {
    const args = arg({});
    const modules = args._.slice(1);
    if (!modules.length) {
      invalid("please provide the name of the modules to be removed");
    }
    removeModules(modules, "demo");
  },
  commit: () => {
    const args = arg({});
    const modules = args._.slice(1);
    if (!modules.length) {
      invalid("please provide the name of the modules to be commited");
    }
    commitModules(modules, "demo");
  },
  upgrade: () => {
    upgradeScaffold();
  },
  help: () => {
    console.log(`usage: npx crowdbotics/modules <command>

Commands available:
  parse    Parse and validate your modules
  demo     Generate a local React Native and Django demo app
  add      Install a module in the demo app
  remove   Remove a module from the demo app
  commit   Update an existing module from the demo source code
  upgrade  Upgrade your existing app's scaffold to the latest version

Parsing modules:
  npx crowdbotics/modules parse --source <path>

Parsing modules and writing to a json file:
  npx crowdbotics/modules parse --source <path> --write <path>`);
  }
};

try {
  dispatcher();
} catch (err) {
  invalid(err.message);
}
