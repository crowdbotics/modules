#!/usr/bin/env node
/**
 * Scaffold Upgrade tool
 *
 * Run it in your app's repository with: npx crowdbotics/modules
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync, execSync } from "node:child_process";
import inquirer from "inquirer";
import { XMLParser } from "fast-xml-parser";
import { dump } from "js-yaml";
import config, { valid, invalid, warn, section } from "./config.js";
const userdir = process.cwd();

function start() {
  section("Scaffold upgrade started");
  section("Checking environment compatibility");
  const yarn = spawnSync("yarn", ["--version"], {
    cwd: userdir,
    encoding: "utf8"
  });
  if (yarn.error) {
    invalid("yarn is not available in your system");
  } else {
    valid("yarn version", yarn.stdout);
  }
  const git = spawnSync("git", ["--version"], {
    cwd: userdir,
    encoding: "utf8"
  });
  if (git.error) {
    invalid("git is not available in your system");
  } else {
    valid(git.stdout);
  }
  const pipenv = spawnSync("pipenv", ["--version"], {
    cwd: userdir,
    encoding: "utf8"
  });
  if (pipenv.error) {
    invalid("pipenv is not available in your system");
  } else {
    valid(pipenv.stdout);
  }
}

function versionCheck(version) {
  section("Detecting your .crowdbotics.json version");
  const crowdboticsJSON = fs.readFileSync(
    path.join(userdir, config.constants.CROWDBOTICS_FILE),
    "utf8"
  );
  const userVersion = JSON.parse(crowdboticsJSON).scaffold.version;

  if (userVersion === version.nextVersion) {
    invalid("You are already at the latest scaffold version");
  } else if (userVersion !== version.previousVersion) {
    invalid(`Expected version ${version.previousVersion}, got`, userVersion);
  } else {
    valid("Upgradable version detected:", userVersion);
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
}

function setupLocalModulesRepo(version) {
  if (fs.existsSync(path.join(userdir, config.upgrade.build.modulesRepoDir))) {
    section("Reusing local clone of modules repo");
    return;
  }
  section("Cloning modules repo");
  spawnSync("mkdir", ["-p", "build"], { cwd: userdir });
  spawnSync("git", ["init", config.upgrade.build.modulesRepoDir], {
    cwd: userdir
  });
  spawnSync(
    "git",
    ["remote", "add", "origin", config.constants.MODULES_REPO_ORIGIN],
    {
      cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
    }
  );
  spawnSync("git", ["fetch"], {
    cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
  });
  spawnSync("git", ["checkout", version.previousVersionSHA], {
    cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
  });
  section("installing npm packages");
  spawnSync("yarn", ["install"], {
    cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
  });
  spawnSync(
    "yarn",
    [
      "add",
      "@babel/preset-typescript",
      "@babel/preset-env",
      "@babel/preset-react",
      "prettier"
    ],
    {
      cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
    }
  );
  spawnSync("mkdir", ["-p", config.upgrade.build.diff], {
    cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
  });
  section("installing python packages");
  const install = spawnSync(
    "pipenv",
    ["install", config.constants.COOKIECUTTER_PACKAGE],
    {
      cwd: path.join(userdir, config.upgrade.build.modulesRepoDir),
      encoding: "utf8"
    }
  );
  if (install.error) {
    console.error(install.stdout);
    console.error(install.stderr);
    invalid("cookiecutter installation failed");
  }
  section("git commit package manager files");
  spawnSync(
    "git",
    ["add", "Pipfile", "Pipfile.lock", "package.json", "yarn.lock"],
    {
      cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
    }
  );
  spawnSync("git", ["commit", "-m", '"update package manager files"'], {
    cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
  });
}

function getProjectCookiecutterContext(version) {
  section("Detecting your project name, slug, and ssh key fingerprint");
  let context = {};
  if (version.previousVersion !== "1.1.0") {
    context = JSON.parse(
      fs.readFileSync(path.join(userdir, ".crowdbotics.json"), "utf8")
    ).scaffold.cookiecutter_context;
    return context;
  }

  const options = {
    ignoreAttributes: false
  };
  const parser = new XMLParser(options);
  let xml, obj;

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
  context.project_name = obj.resources.string.filter(
    (str) => str["@_name"] === "original_app_name"
  )[0]["#text"];

  context.project_slug = [];

  xml = fs.readFileSync(
    path.join(userdir, "android", "app", "src", "main", "AndroidManifest.xml"),
    "utf8"
  );
  obj = parser.parse(xml);
  const slug = obj.manifest["@_package"].replace(/^(com\.)/g, "");
  context.project_slug.push(slug);

  try {
    xml = fs.readFileSync(
      path.join(userdir, "ios", slug, "LaunchScreen.storyboard"),
      "utf8"
    );
    obj = parser.parse(xml);
    context.project_slug.push(
      obj.document.scenes.scene.objects.viewController.view.subviews.label[0][
        "@_text"
      ]
    );
    const json = JSON.parse(
      fs.readFileSync(path.join(userdir, "app.json"), "utf8")
    );
    context.project_slug.push(json.name);
    context.project_slug.push(json.displayName);

    const freqArray = context.project_slug;
    const freqMap = {};
    let mostFrequent = context.project_slug[0];
    let mostFrequentCount = 1;

    for (let i = 0; i < freqArray.length; i++) {
      const element = freqArray[i];

      if (freqMap[element]) {
        freqMap[element]++;
      } else {
        freqMap[element] = 1;
      }

      if (freqMap[element] > mostFrequentCount) {
        mostFrequent = element;
        mostFrequentCount = freqMap[element];
      }
    }

    context.project_slug = mostFrequent;
  } catch (err) {
    context.project_slug = context.project_slug[0];
    warn("project_slug extracted with low confidence:", err.message);
  }

  const txt = fs
    .readFileSync(
      path.join(userdir, ".circleci", "generate_mobile_ios_config.sh"),
      "utf8"
    )
    .split("\n");

  const index = txt.findIndex((line) => line.includes("fingerprints:")) + 1;
  context.ssh_key_fingerprint = txt[index]
    .trim()
    .replace("- '", "")
    .replace("'", "");

  return context;
}

function setupCookiecutter(context, version) {
  section(`Generating v${version.previousVersion} template with cookiecutter`);
  const yaml = dump({
    default_context: context
  });
  fs.writeFileSync(
    path.join(
      userdir,
      config.upgrade.build.modulesRepoDir,
      config.upgrade.build.contextYaml
    ),
    yaml,
    "utf8"
  );
  spawnSync("git", ["checkout", version.previousVersionSHA], {
    cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
  });
  const run = spawnSync(
    "pipenv",
    [
      "run",
      "cookiecutter",
      path.join(userdir, config.upgrade.build.modulesRepoDir, "dist", "cookie"),
      "--config-file",
      path.join(
        userdir,
        config.upgrade.build.modulesRepoDir,
        config.upgrade.build.contextYaml
      ),
      "--output-dir",
      path.join(
        userdir,
        config.upgrade.build.modulesRepoDir,
        config.upgrade.build.templatePrevious
      ),
      "--no-input",
      "--overwrite-if-exists"
    ],
    {
      cwd: path.join(userdir, config.upgrade.build.modulesRepoDir),
      encoding: "utf8"
    }
  );
  if (run.error) {
    console.error(run.stdout);
    console.error(run.stderr);
    invalid("template creation failed");
  }

  section(`Generating v${version.nextVersion} template with cookiecutter`);
  spawnSync("git", ["checkout", version.nextVersionSHA], {
    cwd: path.join(userdir, config.upgrade.build.modulesRepoDir)
  });
  const run2 = spawnSync(
    "pipenv",
    [
      "run",
      "cookiecutter",
      path.join(userdir, config.upgrade.build.modulesRepoDir, "dist", "cookie"),
      "--config-file",
      path.join(
        userdir,
        config.upgrade.build.modulesRepoDir,
        config.upgrade.build.contextYaml
      ),
      "--output-dir",
      path.join(
        userdir,
        config.upgrade.build.modulesRepoDir,
        config.upgrade.build.templateNext
      ),
      "--no-input",
      "--overwrite-if-exists"
    ],
    {
      cwd: path.join(userdir, config.upgrade.build.modulesRepoDir),
      encoding: "utf8"
    }
  );
  if (run2.error) {
    console.error(run2.stdout);
    console.error(run2.stderr);
    invalid("template creation failed");
  }
}

function updateFiles(slug, file, type) {
  // file doesn't exist in the user repo
  if (
    !fs.existsSync(path.join(userdir, file)) &&
    !fs.existsSync(path.join(userdir, file))
  ) {
    const dir = path.dirname(file);
    if (dir !== ".") {
      spawnSync("mkdir", ["-p", dir], { cwd: userdir });
    }
    fs.copyFileSync(
      path.join(
        userdir,
        config.upgrade.build.modulesRepoDir,
        config.upgrade.build.templateNext,
        slug,
        file
      ),
      path.join(userdir, file)
    );
    spawnSync("git", ["add", path.join(userdir, file)], {
      cwd: userdir,
      stdio: "inherit"
    });
    valid(file);
    return;
  }

  if (type !== "addition") {
    const A = fs.readFileSync(
      path.join(
        userdir,
        config.upgrade.build.modulesRepoDir,
        config.upgrade.build.templatePrevious,
        slug,
        file
      ),
      "utf8"
    );
    const B = fs.readFileSync(
      path.join(
        userdir,
        config.upgrade.build.modulesRepoDir,
        config.upgrade.build.templateNext,
        slug,
        file
      ),
      "utf8"
    );
    if (A === B) {
      valid(file);
      return;
    }
  }

  switch (type) {
    case "addition": {
      const dir = path.dirname(file);
      if (dir !== ".") {
        spawnSync("mkdir", ["-p", dir], { cwd: userdir });
      }
      fs.copyFileSync(
        path.join(
          userdir,
          config.upgrade.build.modulesRepoDir,
          config.upgrade.build.templateNext,
          slug,
          file
        ),
        path.join(userdir, file)
      );
      spawnSync("git", ["add", path.join(userdir, file)], {
        cwd: userdir,
        stdio: "inherit"
      });
      return;
    }
    case "babel": {
      const A = spawnSync(
        "npx",
        [
          "babel",
          "--presets=@babel/preset-typescript,@babel/preset-env,@babel/preset-react",
          `--out-file=${path.join(
            userdir,
            config.upgrade.build.modulesRepoDir,
            config.upgrade.build.diff,
            "A"
          )}`,
          path.join(userdir, file)
        ],
        {
          cwd: path.join(userdir, config.upgrade.build.modulesRepoDir),
          encoding: "utf8"
        }
      );
      if (A.error) {
        console.error(A.stdout);
        console.error(A.stderr);
      }
      const B = spawnSync(
        "npx",
        [
          "babel",
          "--presets=@babel/preset-typescript,@babel/preset-env,@babel/preset-react",
          `--out-file=${path.join(
            userdir,
            config.upgrade.build.modulesRepoDir,
            config.upgrade.build.diff,
            "B"
          )}`,
          path.join(
            userdir,
            config.upgrade.build.modulesRepoDir,
            config.upgrade.build.templatePrevious,
            slug,
            file
          )
        ],
        {
          cwd: path.join(userdir, config.upgrade.build.modulesRepoDir),
          encoding: "utf8"
        }
      );
      if (B.error) {
        console.error(B.stdout);
        console.error(B.stderr);
      }
      spawnSync(
        "npx",
        [
          "prettier",
          "--parser=babel-ts",
          "--single-quote",
          "--write",
          path.join(
            userdir,
            config.upgrade.build.modulesRepoDir,
            config.upgrade.build.diff,
            "A"
          ),
          path.join(
            userdir,
            config.upgrade.build.modulesRepoDir,
            config.upgrade.build.diff,
            "B"
          )
        ],
        {
          cwd: path.join(userdir, config.upgrade.build.modulesRepoDir),
          encoding: "utf8"
        }
      );
      break;
    }
    case "json": {
      fs.writeFileSync(
        path.join(
          userdir,
          config.upgrade.build.modulesRepoDir,
          config.upgrade.build.diff,
          "A"
        ),
        JSON.stringify(
          JSON.parse(fs.readFileSync(path.join(userdir, file), "utf8")),
          null,
          2
        ),
        "utf8"
      );
      fs.writeFileSync(
        path.join(
          userdir,
          config.upgrade.build.modulesRepoDir,
          config.upgrade.build.diff,
          "B"
        ),
        JSON.stringify(
          JSON.parse(
            fs.readFileSync(
              path.join(
                userdir,
                config.upgrade.build.modulesRepoDir,
                config.upgrade.build.templatePrevious,
                slug,
                file
              ),
              "utf8"
            )
          ),
          null,
          2
        ),
        "utf8"
      );
      break;
    }
    default:
      fs.copyFileSync(
        path.join(userdir, file),
        path.join(
          userdir,
          config.upgrade.build.modulesRepoDir,
          config.upgrade.build.diff,
          "A"
        )
      );
      fs.copyFileSync(
        path.join(
          userdir,
          config.upgrade.build.modulesRepoDir,
          config.upgrade.build.templatePrevious,
          slug,
          file
        ),
        path.join(
          userdir,
          config.upgrade.build.modulesRepoDir,
          config.upgrade.build.diff,
          "B"
        )
      );
      break;
  }

  const git = spawnSync(
    "git",
    [
      "diff",
      "--no-index",
      "--ignore-space-change",
      "--ignore-blank-lines",
      "--ignore-cr-at-eol",
      "--ignore-space-at-eol",
      "--",
      path.join(
        userdir,
        config.upgrade.build.modulesRepoDir,
        config.upgrade.build.diff,
        "A"
      ),
      path.join(
        userdir,
        config.upgrade.build.modulesRepoDir,
        config.upgrade.build.diff,
        "B"
      )
    ],
    {
      cwd: path.join(userdir, config.upgrade.build.modulesRepoDir),
      encoding: "utf8"
    }
  );
  const src = path.join(
    userdir,
    config.upgrade.build.modulesRepoDir,
    config.upgrade.build.templateNext,
    slug,
    file
  );

  if (git.error) {
    // Create a pristine file
    const pristine = `${path.basename(
      file,
      path.extname(file)
    )}.new${path.extname(file)}`;
    const dest = path.join(userdir, path.join(path.dirname(file), pristine));
    fs.copyFileSync(src, dest);

    // Create a diff file
    const diffFile = `${path.basename(file)}.diff`;
    const diffPath = path.join(userdir, path.dirname(file), diffFile);
    spawnSync(
      "git",
      [
        "diff",
        "--no-index",
        `--output=${diffPath}`,
        "--",
        path.join(
          userdir,
          config.upgrade.build.modulesRepoDir,
          config.upgrade.build.templatePrevious,
          slug,
          file
        ),
        path.join(userdir, file)
      ],
      {
        cwd: path.join(userdir),
        encoding: "utf8"
      }
    );
    const diffHeader = `# File: ${path.join(userdir, file)}
# Original: ${path.join(
      userdir,
      config.upgrade.build.modulesRepoDir,
      config.upgrade.build.templatePrevious,
      slug,
      file
    )}
#
# This is a git diff between your local version of the file and the scaffold
# original. Go over all the changes displayed here and consider which ones
# you would like to bring to the new version of this file:
# ${pristine}.
#
# When you finish replace your ${path.basename(file)} with ${pristine}.\n\n`;
    const diff = fs.readFileSync(diffPath, "utf8");
    fs.writeFileSync(diffPath, diffHeader.concat(diff));
    warn(
      `${file} - Failed integrity check. Refer to the new version ${pristine} and it's diff.`
    );
  } else {
    valid(file);
    const dest = path.join(userdir, file);
    fs.copyFileSync(src, dest);
    spawnSync("git", ["add", dest], {
      cwd: userdir,
      stdio: "inherit"
    });
  }
}

function finish() {
  section("Scaffold upgrade finished");
  section("Running git status for review");
  spawnSync("git", ["status", "-u"], {
    cwd: path.join(userdir),
    stdio: "inherit"
  });
  process.exit(0);
}

const upgrade = (version) => {
  const performUpgrade = () => {
    start();
    versionCheck(version);
    stashSave();
    setupLocalModulesRepo(version);
    const context = getProjectCookiecutterContext(version);
    setupCookiecutter(context, version);
    section("Check files integrity and upgrade to new versions");
    const manifest = JSON.parse(
      fs.readFileSync(
        path.join(
          config.upgrade.build.modulesRepoDir,
          version.upgradeManifestImport
        ),
        "utf8"
      )
    );
    manifest.forEach((file) => {
      file.path = file.path.replace(
        config.upgrade.manifest.slugPlaceholderRegex,
        context.project_slug
      );
      updateFiles(context.project_slug, file.path, file.type);
    });
    finish();
  };

  return performUpgrade;
};

const parse = () => {
  const context = getProjectCookiecutterContext();
  console.log(context);
  process.exit(0);
};

const removeCache = () => {
  fs.rmSync(path.join(userdir, config.upgrade.build.modulesRepoDir), {
    recursive: true
  });
};

const resetHEAD = () => {
  spawnSync("git", ["reset", "--hard", "HEAD"], {
    cwd: path.join(userdir),
    stdio: "inherit"
  });
  const status = execSync("git status -u --porcelain=v1 | cut -c 4-", {
    cwd: path.join(userdir),
    encoding: "utf8"
  });
  if (status) {
    status
      .split("\n")
      .filter((stat) => stat)
      .forEach((stat) =>
        spawnSync("rm", [stat], {
          cwd: path.join(userdir),
          stdio: "inherit"
        })
      );
  }
};

const removeDiffs = () => {
  execSync('find . -type f -name "*.diff" -delete', {
    cwd: path.join(userdir),
    stdio: "inherit"
  });
};

const versions = config.upgrade.versions.reduce(
  (acc, version) => ({
    ...acc,
    [version.text]: upgrade(version)
  }),
  {}
);

const choices = Object.assign(versions, {
  "Undo all changes": resetHEAD,
  "Remove all diff files": removeDiffs,
  Quit: () => process.exit(0),
  "Print cookiecutter context (debug)": parse,
  "Clear local cache (debug)": removeCache
});

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: Object.keys(choices)
    }
  ])
  .then(({ action }) => choices[action]())
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error("Your environment isn't compatible.");
    } else {
      console.error(error);
    }
  });
