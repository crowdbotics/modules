#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import inquirer from "inquirer";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";
import { dump } from "js-yaml";

const PREVIOUS_VERSION = "1.1.0";
const PREVIOUS_VERSION_LATEST_SHA = "b89bf7efd2818b69673961d87378321cc6e8afc4";
const NEW_VERSION_LATEST_SHA = "upgrade/react-71";
const MODULES_REPO_DIR = ".modules-git";
const COOKIECUTTER_PACKAGE = "cookiecutter==1.7.3";
const MODULES_REPO_ORIGIN = "https://github.com/crowdbotics/modules.git";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userdir = process.cwd();

const section = (msg) => {
  console.log("");
  console.log(">", msg);
};

const valid = (...args) => {
  console.log("\u2705", ...args);
};

const invalid = (...args) => {
  console.error("\u274C", ...args);
  process.exit(1);
};

function start() {
  section("scaffold upgrade started");
  section("checking environment compatibility");
  const git = spawnSync("git", ["--version"], {
    cwd: userdir,
    stdio: "inherit"
  });
  if (git.status) {
    invalid("git is not available in your system");
  }
  const python = spawnSync("python", ["--version"], {
    cwd: userdir,
    stdio: "inherit"
  });
  if (python.status) {
    invalid("python is not available in your system");
  }
}

function stashSave() {
  const cmd = spawnSync("git", ["stash", "save", "-u"], {
    cwd: userdir,
    encoding: "utf8"
  });
  const saved = cmd.stdout.includes("Saved working directory and index state");
  if (saved) section("unsaved changes have been stashed");
  return saved;
}

function versionCheck() {
  section("detecting your .crowdbotics.json version");
  const crowdboticsJSON = fs.readFileSync(
    path.join(userdir, ".crowdbotics.json"),
    "utf8"
  );
  const { version } = JSON.parse(crowdboticsJSON).scaffold;

  if (version != PREVIOUS_VERSION) {
    invalid(`Expected version ${PREVIOUS_VERSION}, got`, version);
  } else {
    valid("Compatible version detected:", version);
  }
}

function setupLocalModulesRepo() {
  if (fs.existsSync(path.join(userdir, MODULES_REPO_DIR))) {
    section("reusing local clone of modules repo");
    return;
  }
  section("cloning modules repo");
  spawnSync("git", ["init", MODULES_REPO_DIR], { cwd: userdir });
  spawnSync("git", ["remote", "add", "origin", MODULES_REPO_ORIGIN], {
    cwd: path.join(userdir, MODULES_REPO_DIR)
  });
  spawnSync("git", ["fetch"], {
    cwd: path.join(userdir, MODULES_REPO_DIR)
  });
  spawnSync("git", ["checkout", PREVIOUS_VERSION_LATEST_SHA], {
    cwd: path.join(userdir, MODULES_REPO_DIR)
  });
}

function getProjectCookiecutterContext() {
  section("detecting your project name and slug");
  const context = {};

  const options = {
    ignoreAttributes: false
  };
  const parser = new XMLParser(options);
  let txt, xml, obj;

  // TODO - test more targets for parsing project_name and measure hit rate?
  xml = fs.readFileSync(
    path.join(
      userdir,
      "android",
      "app",
      "src",
      "main",
      "res",
      "values",
      "strings.xml"
    ),
    "utf8"
  );
  obj = parser.parse(xml);
  context["project_name"] = obj.resources.string.filter(
    (str) => str["@_name"] === "original_app_name"
  )[0]["#text"];

  // TODO - test more targets for parsing project_slug and measure hit rate?
  xml = fs.readFileSync(
    path.join(userdir, "android", "app", "src", "main", "AndroidManifest.xml"),
    "utf8"
  );
  obj = parser.parse(xml);
  context["project_slug"] = obj.manifest["@_package"].replace(/^(com\.)/g, "");

  txt = fs
    .readFileSync(
      path.join(userdir, ".circleci", "generate_mobile_ios_config.sh"),
      "utf8"
    )
    .split("\n");

  let index = txt.findIndex((line) => line.includes("fingerprints:")) + 1;
  context["ssh_key_fingerprint"] = txt[index];

  return context;
}

function setupCookiecutter(context) {
  if (fs.existsSync(path.join(userdir, MODULES_REPO_DIR, "baked"))) {
    section("reusing cookiecutter baked template");
    return;
  }
  section("setting up cookiecutter");
  const install = spawnSync("pipenv", ["install", COOKIECUTTER_PACKAGE], {
    cwd: path.join(userdir, MODULES_REPO_DIR),
    encoding: "utf8"
  });
  if (install.status) {
    console.error(install.stdout);
    console.error(install.stderr);
    invalid("cookiecutter installation failed");
  }

  section("generating template with cookiecutter");
  const yaml = dump({
    default_context: context
  });
  fs.writeFileSync(
    path.join(userdir, MODULES_REPO_DIR, "context.yaml"),
    yaml,
    "utf8"
  );
  const run = spawnSync(
    "pipenv",
    [
      "run",
      "cookiecutter",
      path.join(userdir, MODULES_REPO_DIR, "dist", "cookie"),
      "--config-file",
      path.join(userdir, MODULES_REPO_DIR, "context.yaml"),
      "--output-dir",
      path.join(userdir, MODULES_REPO_DIR, "baked"),
      "--no-input"
    ],
    {
      cwd: path.join(userdir, MODULES_REPO_DIR),
      encoding: "utf8"
    }
  );
  if (run.status) {
    console.error(run.stdout);
    console.error(run.stderr);
    invalid("template creation failed");
  }

  spawnSync("git", ["checkout", NEW_VERSION_LATEST_SHA], {
    cwd: path.join(userdir, MODULES_REPO_DIR)
  });
  const run2 = spawnSync(
    "pipenv",
    [
      "run",
      "cookiecutter",
      path.join(userdir, MODULES_REPO_DIR, "dist", "cookie"),
      "--config-file",
      path.join(userdir, MODULES_REPO_DIR, "context.yaml"),
      "--output-dir",
      path.join(userdir, MODULES_REPO_DIR, "newbaked"),
      "--no-input"
    ],
    {
      cwd: path.join(userdir, MODULES_REPO_DIR),
      encoding: "utf8"
    }
  );
  if (run2.status) {
    console.error(run2.stdout);
    console.error(run2.stderr);
    invalid("template creation failed");
  }
}

function cleanup() {
  section("cleaning up");
  //fs.rmSync(path.join(userdir, MODULES_REPO_DIR), { recursive: true });
}

function stashPop(saved) {
  if (!saved) return;
  section("popping previously saved git stash");
  spawnSync("git", ["stash", "pop"], {
    cwd: userdir
  });
}

function finish() {
  section("scaffold upgrade finished");
  process.exit(0);
}

const upgrade = () => {
  start();
  const saved = stashSave();
  versionCheck();
  setupLocalModulesRepo();
  const context = getProjectCookiecutterContext();
  setupCookiecutter(context);
  cleanup();
  stashPop(saved);
  finish();
};

const actions = {
  ["Quit"]: () => process.exit(0),
  ["Upgrade my scaffold"]: upgrade
};

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: ["Upgrade my scaffold", "Quit"]
    }
  ])
  .then((answers) => actions[answers.action]())
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error("Your environment isn't compatible.");
    } else {
      console.error(error);
    }
  });
