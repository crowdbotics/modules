#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import inquirer from "inquirer";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";
import { dump } from "js-yaml";

const FILES_PAIRS_LOOKUP = [
  {
    old: path.join("App.js"),
    new: path.join("App.tsx"),
    babel: true
  },
  {
    old: path.join("babel.config.js"),
    new: path.join("babel.config.js"),
    babel: true
  }
];

const COOKIECUTTER_PACKAGE = "cookiecutter==1.7.3";

const PREVIOUS_VERSION = "1.1.0";
const PREVIOUS_VERSION_LATEST_SHA = "b89bf7efd2818b69673961d87378321cc6e8afc4";
const NEW_VERSION = "2.0.0";
const NEW_VERSION_LATEST_SHA = "upgrade/react-71";

const MODULES_REPO_DIR = "build/crowdbotics";
const MODULES_REPO_ORIGIN = "https://github.com/crowdbotics/modules.git";

const DIFF = "build/diff";
const BAKED = "build/baked";
const NEW_BAKED = "build/newbaked";
const CONTEXT_YAML = "build/context.yaml";

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
  const yarn = spawnSync("yarn", ["--version"], {
    cwd: userdir,
    encoding: "utf8"
  });
  if (yarn.status) {
    invalid("yarn is not available in your system");
  } else {
    valid(yarn.stdout);
  }
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
  const pipenv = spawnSync("pipenv", ["--version"], {
    cwd: userdir,
    encoding: "utf8"
  });
  if (pipenv.status) {
    invalid("pipenv is not available in your system");
  } else {
    valid(pipenv.stdout);
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
  section("installing npm packages");
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
  spawnSync("mkdir", [DIFF, "-p"], {
    cwd: path.join(userdir, MODULES_REPO_DIR)
  });
  section("installing python packages");
  const install = spawnSync("pipenv", ["install", COOKIECUTTER_PACKAGE], {
    cwd: path.join(userdir, MODULES_REPO_DIR),
    encoding: "utf8"
  });
  if (install.status) {
    console.error(install.stdout);
    console.error(install.stderr);
    invalid("cookiecutter installation failed");
  }
  section("git commit package manager files");
  spawnSync(
    "git",
    ["add", "Pipfile", "Pipfile.lock", "package.json", "yarn.lock"],
    {
      cwd: path.join(userdir, MODULES_REPO_DIR)
    }
  );
  spawnSync("git", ["commit", "-m", '"update package manager files"'], {
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
  section("Generating baked template with cookiecutter");
  const yaml = dump({
    default_context: context
  });
  fs.writeFileSync(
    path.join(userdir, MODULES_REPO_DIR, CONTEXT_YAML),
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
      path.join(userdir, MODULES_REPO_DIR, CONTEXT_YAML),
      "--output-dir",
      path.join(userdir, MODULES_REPO_DIR, BAKED),
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
      path.join(userdir, MODULES_REPO_DIR, CONTEXT_YAML),
      "--output-dir",
      path.join(userdir, MODULES_REPO_DIR, NEW_BAKED),
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

function updateFiles(slug, oldfile, newfile, babel = false) {
  if (babel) {
    const A = spawnSync(
      "npx",
      [
        "babel",
        "--presets=@babel/preset-typescript,@babel/preset-env,@babel/preset-react",
        `--out-file=${path.join(userdir, MODULES_REPO_DIR, DIFF, "A")}`,
        path.join(userdir, oldfile)
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
        `--out-file=${path.join(userdir, MODULES_REPO_DIR, DIFF, "B")}`,
        path.join(userdir, MODULES_REPO_DIR, BAKED, slug, oldfile)
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
  } else {
    fs.copyFileSync(
      path.join(userdir, oldfile),
      path.join(userdir, MODULES_REPO_DIR, DIFF, "A")
    );
    fs.copyFileSync(
      path.join(userdir, MODULES_REPO_DIR, BAKED, slug, oldfile),
      path.join(userdir, MODULES_REPO_DIR, DIFF, "B")
    );
  }

  const git = spawnSync(
    "git",
    [
      "diff",
      "--no-index",
      "--",
      path.join(userdir, MODULES_REPO_DIR, DIFF, "A"),
      path.join(userdir, MODULES_REPO_DIR, DIFF, "B")
    ],
    {
      cwd: path.join(userdir, MODULES_REPO_DIR)
    }
  );
  const src = path.join(userdir, MODULES_REPO_DIR, NEW_BAKED, slug, newfile);
  if (git.status) {
    let name = `${path.basename(
      newfile,
      path.extname(newfile)
    )}.new${path.extname(newfile)}`;
    const dest = path.join(userdir, name);
    fs.copyFileSync(src, dest);
    warn(
      `${oldfile} - Failed integrity check. Refer to the new version: ${name}`
    );
  } else {
    if (oldfile != newfile) {
      spawnSync(
        "git",
        ["mv", path.join(userdir, oldfile), path.join(userdir, newfile)],
        {
          cwd: path.join(userdir)
        }
      );
    }
    valid(`${oldfile} - Integrity check passed. File has been replaced.`);
    const dest = path.join(userdir, newfile);
    fs.copyFileSync(src, dest);
  }
}

function cleanup(saved) {
  section("Cleaning up");
  valid("Caching modules repo for future runs");
  if (!saved) return;
  spawnSync("git", ["stash", "pop"], {
    cwd: userdir
  });
  valid("Git stash pop previously saved git stash");
}

function finish() {
  section("Scaffold upgrade finished");
  section("Running git status for review");
  spawnSync("git", ["status"], {
    cwd: path.join(userdir),
    stdio: "inherit"
  });
  process.exit(0);
}

const upgrade = () => {
  start();
  versionCheck();
  const saved = stashSave();
  setupLocalModulesRepo();
  const context = getProjectCookiecutterContext();
  setupCookiecutter(context);
  section("Check files integrity and upgrade to new versions");
  FILES_PAIRS_LOOKUP.forEach((pair) =>
    updateFiles(context.project_slug, pair.old, pair.new, pair.babel)
  );
  cleanup(saved);
  finish();
};

const parse = () => {
  const context = getProjectCookiecutterContext();
  console.log(context);
  process.exit(0);
};

const removeCache = () => {
  fs.rmSync(path.join(userdir, MODULES_REPO_DIR), { recursive: true });
};

const resetHEAD = () => {
  spawnSync("git", ["reset", "--hard", "HEAD"], {
    cwd: path.join(userdir),
    stdio: "inherit"
  });
};

const actions = {
  ["Quit"]: () => process.exit(0),
  ["Upgrade my scaffold"]: upgrade,
  ["Check cookiecutter context"]: parse,
  ["Clean cached directories"]: removeCache,
  ["git reset to HEAD"]: resetHEAD
};

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        "Upgrade my scaffold",
        "Check cookiecutter context",
        "Clean cached directories",
        "git reset to HEAD",
        "Quit"
      ]
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