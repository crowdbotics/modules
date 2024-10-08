#!/usr/bin/env node
/**
 * Crowdbotics Modules tool
 *
 * Run it anywhere with: cb
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
import findGitRoot from "find-git-root";

import { parseModules } from "./scripts/parse.js";
import { createDemo } from "./scripts/demo.js";
import { addModules } from "./scripts/add.js";
import { info } from "./scripts/info.js";
import { removeModules } from "./scripts/remove.js";
import { commitModules } from "./scripts/commit-module.js";
import { upgradeScaffold } from "./scripts/upgrade.js";
import {
  valid,
  invalid,
  isNameValid,
  section,
  isUserEnvironment
} from "./utils.js";
import { createModule } from "./scripts/create.js";
import { login } from "./scripts/login.js";
import { configFile } from "./scripts/utils/configFile.js";
import { sendFeedback } from "./scripts/feedback.js";
import { logout } from "./scripts/logout.js";
import { modulesArchive, modulesGet, modulesList } from "./scripts/modules.js";
import { publish } from "./scripts/publish.js";
import {
  validateEnvironmentDependencies,
  EnvironmentDependency
} from "./scripts/utils/environment.js";
import { analytics } from "./scripts/analytics/wrapper.js";
import { HAS_ASKED_OPT_IN_NAME } from "./scripts/analytics/config.js";
import { EVENT } from "./scripts/analytics/constants.js";
import { askOptIn } from "./scripts/analytics/scripts.js";
import { sentryMonitoring } from "./scripts/utils/sentry.js";

const pkg = JSON.parse(
  fs.readFileSync(new URL("package.json", import.meta.url), "utf8")
);

let sourceDir = path.dirname(path.dirname(process.argv[1]));
if (fs.existsSync(path.join(sourceDir, pkg.name))) {
  // npx lib directory
  sourceDir = path.join(sourceDir, pkg.name);
} else {
  // npm lib directory
  sourceDir = path.join(sourceDir, "lib", "node_modules", pkg.name);
}

const gitRoot = () => {
  try {
    return path.dirname(findGitRoot(process.cwd()));
  } catch {
    invalid(
      `This command must be executed inside a git repository.
Visit our official documentation for more information and try again: https://docs.crowdbotics.com/creating-reusable-modules`
    );
  }
};

async function dispatcher() {
  const useDefaults = process.env.npm_config_yes;

  // check config if they have been asked opted in or out of amplitude
  const hasAskedOptIn = configFile.get(HAS_ASKED_OPT_IN_NAME) || false;
  if (!hasAskedOptIn && isUserEnvironment && !useDefaults) {
    await askOptIn();
  }

  const command = process.argv[2];

  if (!command) {
    return commands.help();
  }

  if (!Object.prototype.hasOwnProperty.call(commands, command)) {
    invalid(`command doesn't exist: ${command}`);
  }

  sentryMonitoring.registerCommandName(command);

  await commands[command]();

  if (!analytics.event.name && !useDefaults) {
    analytics.sendEvent({
      name: EVENT.OTHER,
      properties: {
        command,
        fullCommand: process.argv.slice(2, process.argv.length).join(" ")
      }
    });
  }
}

const commands = {
  demo: () => {
    validateEnvironmentDependencies([
      EnvironmentDependency.Python,
      EnvironmentDependency.PipEnv
    ]);
    createDemo(
      path.join(gitRoot(), "demo"),
      path.join(sourceDir, "cookiecutter.yaml")
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

    const data = parseModules(path.join(args["--source"]), gitRoot());
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
    validateEnvironmentDependencies([
      EnvironmentDependency.Python,
      EnvironmentDependency.Yarn
    ]);

    const args = arg({
      "--source": String,
      "--project": String
    });
    const modules = args._.slice(1);
    if (!modules.length) {
      invalid("please provide the name of the modules to be installed");
    }
    addModules(modules, args["--source"], args["--project"], gitRoot());
  },
  remove: () => {
    validateEnvironmentDependencies([EnvironmentDependency.Yarn]);

    const args = arg({
      "--source": String,
      "--project": String
    });
    const modules = args._.slice(1);
    if (!modules.length) {
      invalid("please provide the name of the modules to be removed");
    }
    removeModules(modules, args["--source"], args["--project"], gitRoot());
  },
  create: () => {
    validateEnvironmentDependencies([
      EnvironmentDependency.Python,
      EnvironmentDependency.CookieCutter
    ]);

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
    if (!isNameValid(args["--name"])) {
      invalid(
        `invalid module name provided: '${args["--name"]}'. Use only alphanumeric characters, dashes and underscores.`
      );
    }

    analytics.sendEvent({
      name: EVENT.CREATE_MODULE,
      properties: { Name: args["--name"] }
    });

    createModule(args["--name"], args["--type"], args["--target"], gitRoot());
  },
  commit: () => {
    const args = arg({
      "--source": String
    });
    const modules = args._.slice(1);
    if (!modules.length) {
      invalid("please provide the name of the modules to be commited");
    }
    commitModules(modules, args["--source"], gitRoot());
  },
  init: () => {
    validateEnvironmentDependencies([EnvironmentDependency.Git]);

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
    analytics.sendEvent({ name: EVENT.UPGRADE });
    upgradeScaffold(args["--version"]);
  },
  login: () => {
    login();
  },
  logout: () => {
    logout();
  },
  info: () => {
    info();
  },
  config: () => {
    const args = arg({});

    const action = args._[1];
    const key = args._[2];
    const value = args._[3];

    if (!action.length) {
      return invalid("Please provide the action to perform on the config");
    }

    switch (action) {
      case "set":
        if (!key) {
          return invalid("Please specify the config key to set.");
        }
        if (!value) {
          return invalid("Please specify the config value to set.");
        }

        configFile.set(key, value);
        configFile.save();

        break;
      case "get":
        if (!key) {
          return invalid("Please specify the config key to get.");
        }

        section(configFile.get(key));

        break;
      default:
        invalid(`Invalid action "${action}" for config command`);
    }
  },

  modules: async () => {
    const args = arg({
      "--search": String,
      "--visibility": String,
      "--status": String,
      "--page": String,
      "--unarchive": Boolean
    });

    let id;
    const action = args._[1];

    if (!action.length) {
      // TODO - Print help?
      return invalid(
        "Please provide the action to perform on the modules, i.e. modules list"
      );
    }

    switch (action) {
      case "list":
        analytics.sendEvent({ name: EVENT.LIST_MODULES });
        await modulesList({
          search: args["--search"],
          status: args["--status"],
          visibility: args["--visibility"],
          page: args["--page"] ? Number(args["--page"]) : undefined
        });
        break;

      case "get":
        id = args._[2];
        if (!id) {
          return invalid(
            "Please provide the id of the module to get, i.e. modules get <123>"
          );
        }

        await modulesGet(id);
        break;

      case "archive":
        id = args._[2];
        if (!id) {
          return invalid(
            "Please provide the id of the module to archive, i.e. modules archive <123>"
          );
        }

        await modulesArchive(id, !!args["--unarchive"]);
        break;

      case "help":
        section(
          `Commands available:
  list          List the current modules available to install
                --search <query> Search for a module by given text
                --status <published | archived> Search for a module by either published or archived modules (default all)
                --visibility <private | public> Search for a module with a specific visibility (default all)
  get     <id>  Get the details for the specified module
  archive <id> Archive the specified module to prevent future installation to a project
                --unarchive Undo the archive of the module to set the status back to Published
          `
        );
        break;

      default:
        invalid(`Invalid action "${action}" for modules command`);
    }
  },
  publish: () => {
    analytics.sendEvent({
      name: EVENT.PUBLISH_MODULES
    });
    publish();
  },

  feedback: () => {
    const args = arg({});
    const action = args._[1];

    if (!action) {
      return invalid(
        "Please provide the message or action to perform for feedback"
      );
    }
    switch (action) {
      case "help":
        console.log(`
        Influence how Crowdbotics shapes and grows its developer tools. Use the feedback
        command to send ideas and recommendations to our Product Team any time. We may
        contact you to follow up.

        Please contact Support for help using Crowdbotics or to report errors, bugs, and
        other issues.
        https://app.crowdbotics.com/dashboard/user/support
        `);
        break;

      default:
        sendFeedback(action);
    }
  },

  help: () => {
    console.log(`usage: cb <command>

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
  feedback Send feedback to Crowdbotics to let us know how we're doing
  login    Login to your Crowdbotics account. Requires 2FA authentication
  logout   Logout of your Crowdbotics account
  publish  Publish your modules to your organization's private catalog
  modules  Manage modules for your organization

Parse and validate your modules:
  cb parse --source <path>

Parse modules and write the data to a json file:
  cb parse --source <path> --write <path>

Create a demo app:
  cb demo

Create a module of a given type:
  cb create --name <module-name> --type <all/react-native/django>

Initialize a modules repository:
  cb init --name <my-modules-repository-name>

Upgrade your scaffold to the latest master:
  cb upgrade

Upgrade your scaffold to a specific version (git tag, git commit or branch name):
  cb upgrade --version 2.3.0

Install one or modules to your demo app:
  cb add <module-name> <module-name-2>

Remove one or modules from your demo app:
  cb remove <module-name> <module-name-2>

Install modules from other directory:
  cb add --source ../other-repository <module-name>

Install modules to other app that is not "demo":
  cb add --project ../other-project <module-name>

Remove modules from app that is not "demo":
  cb remove --project ../other-project <module-name>

Update a module definition from the demo app:
  cb commit <module-name>

Update a module definition from other app:
  cb commit <module-name> --source <path>

Glossary:
  <module-name> stands for the name of the directory where the module is defined.
`);
  }
};

try {
  dispatcher();
} catch (err) {
  invalid(err);
}
