import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import config from "../config.js";

const latestUpgrade = config.upgrade.versions.at(-1);
const demoDir = path.join(process.cwd(), config.demo.directory);
const __dirname = process.cwd();

const shouldProcessDirectory = (entry) => {
  return !config.upgrade.manifest.ignoreDirectories.includes(
    path.relative(process.cwd(), entry)
  );
};

const templatizePath = (file) => {
  if (latestUpgrade.ignoreTemplatize.includes(file)) return file;

  return file.replace(
    config.demo.placeholderNameRegex,
    config.upgrade.manifest.slugPlaceholder
  );
};

const getFileType = (file) => {
  switch (true) {
    case /\.(c|m)?(t|j)sx?$/.test(file):
      return "babel";
    case /\.json$/.test(file):
      return "json";
    default:
      return "text";
  }
};

const getAllFiles = (directory, relative, accumulator = []) => {
  const entries = fs.readdirSync(directory);

  entries.forEach((entry) => {
    const entryPath = path.join(directory, entry);
    const isDirectory = fs.statSync(entryPath).isDirectory();

    if (isDirectory) {
      if (shouldProcessDirectory(entryPath)) {
        accumulator = getAllFiles(entryPath, relative, accumulator);
      }
    } else {
      accumulator.push({
        path: templatizePath(path.relative(relative, entryPath)),
        type: getFileType(path.basename(entryPath))
      });
    }
  });

  return accumulator;
};

spawnSync("yarn", ["run", "demo"], {
  cwd: __dirname,
  encoding: "utf8",
  stdio: "inherit"
});

fs.rmSync(path.join(__dirname, "build", "worktree"), {
  recursive: true,
  force: true
});
fs.mkdirSync(path.join(__dirname, "build", "worktree"), { recursive: true });

spawnSync(
  "git",
  ["worktree", "add", "-f", "build/worktree", latestUpgrade.previousVersionSHA],
  {
    cwd: __dirname,
    encoding: "utf8",
    stdio: "inherit"
  }
);

spawnSync("pipenv", ["lock"], {
  cwd: path.join(__dirname, "build", "worktree"),
  encoding: "utf8",
  stdio: "inherit"
});

spawnSync("yarn", ["install"], {
  cwd: path.join(__dirname, "build", "worktree"),
  encoding: "utf8",
  stdio: "inherit"
});

spawnSync("yarn", ["run", "demo"], {
  cwd: path.join(__dirname, "build", "worktree"),
  encoding: "utf8",
  stdio: "inherit"
});

fs.rmSync(path.join(__dirname, "build", "worktree", "demo", "node_modules"), {
  recursive: true
});

fs.rmSync(path.join(__dirname, "build", "worktree", "demo", "backend"), {
  recursive: true
});

const filesOnPreviousVersion = getAllFiles(
  path.join(__dirname, "build", "worktree", "demo"),
  path.join(__dirname, "build", "worktree", "demo")
);

const files = getAllFiles(demoDir, demoDir);

/**
 * When a file doesn't exist on the previous version and is introduced in the
 * next version then classify it's type as "addition"
 */
files.forEach((file) => {
  if (!filesOnPreviousVersion.find((f) => f.path === file.path)) {
    file.type = "addition";
  }
});

const content = JSON.stringify(files, null, 2);

console.log("Generated manifest for", files.length, "files.");

fs.writeFileSync(
  path.join(process.cwd(), latestUpgrade.upgradeManifestImport),
  content,
  "utf8"
);
