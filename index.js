#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import inquirer from "inquirer";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";
import { dump } from "js-yaml";

const COOKIECUTTER_PACKAGE = "cookiecutter==1.7.3";

const PREVIOUS_VERSION = "1.1.0";
const PREVIOUS_VERSION_LATEST_SHA = "b89bf7efd2818b69673961d87378321cc6e8afc4";
const NEW_VERSION = "2.0.0";
const NEW_VERSION_LATEST_SHA = "upgrade/react-71";

const MODULES_REPO_DIR = "build/crowdbotics";
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

const warn = (...args) => {
  console.log("\u26A0", ...args);
};

function start() {
  section("Scaffold upgrade started");
  section("Checking environment compatibility");
  const git = spawnSync("git", ["--version"], {
    cwd: userdir,
    encoding: "utf8"
  });
  if (git.status) {
    invalid("git is not available in your system");
  } else {
    valid(git.stdout);
  }
  const python = spawnSync("python", ["--version"], {
    cwd: userdir,
    encoding: "utf8"
  });
  if (python.status) {
    invalid("python is not available in your system");
  } else {
    valid(python.stdout);
  }
}

function versionCheck() {
  section("Detecting your .crowdbotics.json version");
  const crowdboticsJSON = fs.readFileSync(
    path.join(userdir, ".crowdbotics.json"),
    "utf8"
  );
  const { version } = JSON.parse(crowdboticsJSON).scaffold;

  if (version == NEW_VERSION) {
    invalid("You are already at the latest scaffold version");
  } else if (version != PREVIOUS_VERSION) {
    invalid(`Expected version ${PREVIOUS_VERSION}, got`, version);
  } else {
    valid("Upgradable version detected:", version);
  }
}

function stashSave() {
  section("Checking for unsaved/untracked files here");
  const cmd = spawnSync("git", ["stash", "save", "-u"], {
    cwd: userdir,
    encoding: "utf8"
  });
  const saved = cmd.stdout.includes("Saved working directory and index state");
  if (saved) valid("Unsaved changes have been stashed");
  return saved;
}

function setupLocalModulesRepo() {
  if (fs.existsSync(path.join(userdir, MODULES_REPO_DIR))) {
    section("Reusing local clone of modules repo");
    return;
  }
  section("Cloning modules repo");
  spawnSync("mkdir", ["build", "-p"], { cwd: userdir });
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
  spawnSync("yarn", ["install"], {
    cwd: path.join(userdir, MODULES_REPO_DIR)
  });
  spawnSync(
    "yarn",
    [
      "add",
      "@babel/preset-typescript",
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    {
      cwd: path.join(userdir, MODULES_REPO_DIR)
    }
  );
  spawnSync("mkdir", ["diff", "-p"], {
    cwd: path.join(userdir, MODULES_REPO_DIR)
  });
}

function getProjectCookiecutterContext() {
  section("Detecting your project name, slug, and ssh key fingerprint");
  const context = {};

  const options = {
    ignoreAttributes: false
  };
  const parser = new XMLParser(options);
  let txt, xml, obj;

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
  context["ssh_key_fingerprint"] = txt[index]
    .trim()
    .replace("- '", "")
    .replace("'", "");

  return context;
}

function setupCookiecutter(context) {
  section("Setting up cookiecutter");
  const install = spawnSync("pipenv", ["install", COOKIECUTTER_PACKAGE], {
    cwd: path.join(userdir, MODULES_REPO_DIR),
    encoding: "utf8"
  });
  if (install.status) {
    console.error(install.stdout);
    console.error(install.stderr);
    invalid("cookiecutter installation failed");
  }

  section("Generating baked template with cookiecutter");
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
      "--no-input",
      "--overwrite-if-exists"
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

  section("Generating newbaked template with cookiecutter");
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
      "--no-input",
      "--overwrite-if-exists"
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

function updateFiles(slug) {
  section("Check files integrity and update to new versions");
  const file = "App.js";
  const A = spawnSync(
    "npx",
    [
      "babel",
      "--presets=@babel/preset-typescript,@babel/preset-env,@babel/preset-react",
      `--out-file=${path.join(userdir, MODULES_REPO_DIR, "diff", "A")}`,
      path.join(userdir, file)
    ],
    {
      cwd: path.join(userdir, MODULES_REPO_DIR),
      encoding: "utf8"
    }
  );
  if (A.status) {
    console.error(A.stdout);
    console.error(A.stderr);
  }

  const B = spawnSync(
    "npx",
    [
      "babel",
      "--presets=@babel/preset-typescript,@babel/preset-env,@babel/preset-react",
      `--out-file=${path.join(userdir, MODULES_REPO_DIR, "diff", "B")}`,
      path.join(userdir, MODULES_REPO_DIR, "baked", slug, "index.js")
    ],
    {
      cwd: path.join(userdir, MODULES_REPO_DIR),
      encoding: "utf8"
    }
  );
  if (B.status) {
    console.error(B.stdout);
    console.error(B.stderr);
  }

  const git = spawnSync(
    "git",
    [
      "diff",
      "--no-index",
      "--",
      path.join(userdir, MODULES_REPO_DIR, "diff", "A"),
      path.join(userdir, MODULES_REPO_DIR, "diff", "B")
    ],
    {
      cwd: path.join(userdir, MODULES_REPO_DIR)
    }
  );
  const src = path.join(userdir, MODULES_REPO_DIR, "newbaked", slug, "App.tsx");

  if (git.status) {
    const dest = path.join(userdir, "App.tsx.new");
    fs.copyFileSync(src, dest);
    warn(
      `Diff detected in your ${file}, Please refer to the new version at ${file}.new.`
    );
  } else {
    const dest = path.join(userdir, "App.tsx");
    fs.copyFileSync(src, dest);
  }
}

function cleanup(saved, cache = true) {
  section("Cleaning up");
  if (!cache) {
    fs.rmSync(path.join(userdir, MODULES_REPO_DIR), { recursive: true });
  } else {
    valid("Caching modules repo for future runs");
  }
  if (!saved) return;
  spawnSync("git", ["stash", "pop"], {
    cwd: userdir
  });
  valid("Git stash pop previously saved git stash");
}

function finish() {
  section("Scaffold upgrade finished");
  process.exit(0);
}

const upgrade = () => {
  start();
  versionCheck();
  const saved = stashSave();
  setupLocalModulesRepo();
  const context = getProjectCookiecutterContext();
  setupCookiecutter(context);
  updateFiles(context.project_slug);
  cleanup(saved);
  finish();
};

const parse = () => {
  const context = getProjectCookiecutterContext();
  console.log(context);
  process.exit(0);
};

const actions = {
  ["Quit"]: () => process.exit(0),
  ["Upgrade my scaffold"]: upgrade,
  ["Check cookiecutter context"]: parse
};

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: ["Upgrade my scaffold", "Check cookiecutter context", "Quit"]
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
