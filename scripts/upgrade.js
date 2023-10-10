import fs from "node:fs";
import path from "node:path";
import { spawnSync, execSync } from "node:child_process";
import inquirer from "inquirer";
import { dump } from "js-yaml";
import config from "../config.js";
import { valid, invalid, warn, section } from "../utils.js";
import { generateManifest } from "./manifest.js";
import { getProjectCookiecutterContext } from "./get-cookiecutter-context.js";

const userdir = process.cwd();

function start() {
  section("Scaffold upgrade started");
  section("Checking environment compatibility");
  const yarn = spawnSync("yarn", ["--version"], {
    cwd: userdir,
    shell: true,
    encoding: "utf8"
  });
  if (yarn.error) {
    invalid("yarn is not available in your system");
  } else {
    valid("yarn version", yarn.stdout);
  }
  const git = spawnSync("git", ["--version"], {
    cwd: userdir,
    shell: true,
    encoding: "utf8"
  });
  if (git.error) {
    invalid("git is not available in your system");
  } else {
    valid(git.stdout);
  }
  const pipenv = spawnSync("pipenv", ["--version"], {
    cwd: userdir,
    shell: true,
    encoding: "utf8"
  });
  if (pipenv.error) {
    invalid("pipenv is not available in your system");
  } else {
    valid(pipenv.stdout);
  }
}

function versionCheck(target) {
  section("Detecting your .crowdbotics.json version");
  try {
    const version = JSON.parse(
      fs.readFileSync(
        path.join(userdir, config.constants.CROWDBOTICS_FILE),
        "utf8"
      )
    ).scaffold.version;

    if (version === target) {
      invalid("You are already at the target scaffold version");
    } else {
      valid("Upgradable version detected:", target);
      return version;
    }
  } catch (e) {
    invalid("Failed to parse your current scaffold version");
  }
}

function stashSave() {
  section("Checking for unsaved/untracked files here");
  const cmd = spawnSync("git", ["stash", "save", "-u"], {
    cwd: userdir,
    shell: true,
    encoding: "utf8"
  });
  const saved = cmd.stdout.includes("Saved working directory and index state");
  if (saved) valid("Unsaved changes have been stashed");
}

function setupLocalScaffoldRepo(target) {
  if (fs.existsSync(path.join(userdir, config.upgrade.build.scaffoldRepoDir))) {
    spawnSync("rm", ["-rf"], {
      cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir),
      shell: true
    });
  }
  section("Cloning scaffold repo");
  spawnSync("mkdir", ["-p", config.upgrade.build.dir], {
    cwd: userdir,
    shell: true
  });
  spawnSync(
    "git",
    [
      "clone",
      config.constants.REACT_NATIVE_SCAFFOLD_REPO_ORIGIN,
      config.upgrade.build.scaffoldRepoDir
    ],
    {
      shell: true,
      cwd: userdir
    }
  );
  if (target !== "master") {
    spawnSync("git", ["checkout", target], {
      shell: true,
      cwd: path.join(config.upgrade.build.scaffoldRepoDir)
    });
  }
  section("installing npm packages");
  spawnSync("yarn", ["install"], {
    shell: true,
    cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir)
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
      shell: true,
      cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir)
    }
  );
  spawnSync("mkdir", ["-p", config.upgrade.build.diff], {
    shell: true,
    cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir)
  });
  section("installing python packages");
  const install = spawnSync(
    "pipenv",
    ["install", config.constants.COOKIECUTTER_PACKAGE],
    {
      shell: true,
      cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir),
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
      shell: true,
      cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir)
    }
  );
  spawnSync("git", ["commit", "-m", '"update package manager files"'], {
    shell: true,
    cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir)
  });
}

function setupCookiecutter(context, userVersion, target) {
  section(`Generating ${userVersion} template with cookiecutter`);
  const yaml = dump({
    default_context: context
  });
  fs.writeFileSync(
    path.join(
      userdir,
      config.upgrade.build.scaffoldRepoDir,
      config.upgrade.build.contextYaml
    ),
    yaml,
    "utf8"
  );
  const run = spawnSync(
    "pipenv run cookiecutter",
    [
      "gh:crowdbotics/react-native-scaffold",
      "--directory dist/cookie",
      "--checkout",
      userVersion,
      "--config-file",
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.contextYaml
      ),
      "--output-dir",
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.templatePrevious
      ),
      "--no-input",
      "--overwrite-if-exists"
    ],
    {
      cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir),
      shell: true,
      encoding: "utf8"
    }
  );
  if (run.error) {
    invalid(`template for ${userVersion} creation failed`);
  }

  section(`Generating ${target} template with cookiecutter`);
  const run2 = spawnSync(
    "pipenv run cookiecutter",
    [
      "gh:crowdbotics/react-native-scaffold",
      "--directory dist/cookie",
      "--checkout",
      target,
      "--config-file",
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.contextYaml
      ),
      "--output-dir",
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.templateNext
      ),
      "--no-input",
      "--overwrite-if-exists"
    ],
    {
      cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir),
      shell: true,
      encoding: "utf8"
    }
  );
  if (run2.error) {
    invalid(`template for v${target} creation failed`);
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
      spawnSync("mkdir", ["-p", dir], {
        shell: true,
        cwd: userdir
      });
    }
    fs.copyFileSync(
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.templateNext,
        slug,
        file
      ),
      path.join(userdir, file)
    );
    spawnSync("git", ["add", path.join(userdir, file)], {
      cwd: userdir,
      shell: true,
      stdio: "inherit"
    });
    valid(file);
    return;
  }

  if (type !== "addition") {
    const A = fs.readFileSync(
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.templatePrevious,
        slug,
        file
      ),
      "utf8"
    );
    const B = fs.readFileSync(
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
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
        spawnSync("mkdir", ["-p", dir], {
          shell: true,
          cwd: userdir
        });
      }
      fs.copyFileSync(
        path.join(
          userdir,
          config.upgrade.build.scaffoldRepoDir,
          config.upgrade.build.templateNext,
          slug,
          file
        ),
        path.join(userdir, file)
      );
      spawnSync("git", ["add", path.join(userdir, file)], {
        cwd: userdir,
        shell: true,
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
            config.upgrade.build.scaffoldRepoDir,
            config.upgrade.build.diff,
            "A"
          )}`,
          path.join(userdir, file)
        ],
        {
          cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir),
          shell: true,
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
            config.upgrade.build.scaffoldRepoDir,
            config.upgrade.build.diff,
            "B"
          )}`,
          path.join(
            userdir,
            config.upgrade.build.scaffoldRepoDir,
            config.upgrade.build.templatePrevious,
            slug,
            file
          )
        ],
        {
          cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir),
          shell: true,
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
            config.upgrade.build.scaffoldRepoDir,
            config.upgrade.build.diff,
            "A"
          ),
          path.join(
            userdir,
            config.upgrade.build.scaffoldRepoDir,
            config.upgrade.build.diff,
            "B"
          )
        ],
        {
          cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir),
          shell: true,
          encoding: "utf8"
        }
      );
      break;
    }
    case "json": {
      fs.writeFileSync(
        path.join(
          userdir,
          config.upgrade.build.scaffoldRepoDir,
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
          config.upgrade.build.scaffoldRepoDir,
          config.upgrade.build.diff,
          "B"
        ),
        JSON.stringify(
          JSON.parse(
            fs.readFileSync(
              path.join(
                userdir,
                config.upgrade.build.scaffoldRepoDir,
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
          config.upgrade.build.scaffoldRepoDir,
          config.upgrade.build.diff,
          "A"
        )
      );
      fs.copyFileSync(
        path.join(
          userdir,
          config.upgrade.build.scaffoldRepoDir,
          config.upgrade.build.templatePrevious,
          slug,
          file
        ),
        path.join(
          userdir,
          config.upgrade.build.scaffoldRepoDir,
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
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.diff,
        "A"
      ),
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.diff,
        "B"
      )
    ],
    {
      cwd: path.join(userdir, config.upgrade.build.scaffoldRepoDir),
      shell: true,
      encoding: "utf8"
    }
  );
  const src = path.join(
    userdir,
    config.upgrade.build.scaffoldRepoDir,
    config.upgrade.build.templateNext,
    slug,
    file
  );

  if (git.status) {
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
          config.upgrade.build.scaffoldRepoDir,
          config.upgrade.build.templatePrevious,
          slug,
          file
        ),
        path.join(userdir, file)
      ],
      {
        cwd: path.join(userdir),
        shell: true,
        encoding: "utf8"
      }
    );
    const diffHeader = `# File: ${path.join(userdir, file)}
# Original: ${path.join(
      userdir,
      config.upgrade.build.scaffoldRepoDir,
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
      shell: true,
      stdio: "inherit"
    });
  }
}

function finish() {
  section("Scaffold upgrade finished");
  section("Running git status for review");
  spawnSync("git", ["status", "-u"], {
    cwd: path.join(userdir),
    shell: true,
    stdio: "inherit"
  });
  process.exit(0);
}

function removeCache() {
  fs.rmSync(path.join(userdir, config.upgrade.build.scaffoldRepoDir), {
    recursive: true
  });
}

function resetHEAD() {
  spawnSync("git", ["reset", "--hard", "HEAD"], {
    cwd: path.join(userdir),
    shell: true,
    stdio: "inherit"
  });
  const status = execSync("git status -u --porcelain=v1 | cut -c 4-", {
    cwd: path.join(userdir),
    shell: true,
    encoding: "utf8"
  });
  if (status) {
    status
      .split("\n")
      .filter((stat) => stat)
      .forEach((stat) =>
        spawnSync("rm", [stat], {
          cwd: path.join(userdir),
          shell: true,
          stdio: "inherit"
        })
      );
  }
}

function removeDiffs() {
  execSync('find . -type f -name "*.diff" -delete', {
    cwd: path.join(userdir),
    shell: true,
    stdio: "inherit"
  });
}

function upgrade(target) {
  function perform() {
    start();
    setupLocalScaffoldRepo(target);
    const version = versionCheck(target);
    stashSave();
    const context = getProjectCookiecutterContext(userdir, version);
    setupCookiecutter(context, version, target);
    section("Check files integrity and upgrade to new versions");
    const manifest = generateManifest(
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.templatePrevious
      ),
      path.join(
        userdir,
        config.upgrade.build.scaffoldRepoDir,
        config.upgrade.build.templateNext
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
  }

  return perform;
}

export function upgradeScaffold(target = "master") {
  const choices = {
    "Upgrade your scaffold": upgrade(target),
    "Undo all changes": resetHEAD,
    "Remove all diff files": removeDiffs,
    "Clear local cache (debug)": removeCache,
    Quit: () => process.exit(0)
  };

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Which action would you like to perform?",
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
}
