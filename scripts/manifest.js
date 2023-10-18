/**
 * A manifest is an exhaustive list of all the files that the scaffold
 * is made of, generated from scaffolding a demo app and then iterating through
 * the filesystem. For each file the manifest specifies it's filepath and the
 * type of file. This manifest data is used in the user's upgrade script.
 */
import fs from "node:fs";
import path from "node:path";
import config from "../config.js";

const IGNORE_TEMPLATIZE = [
  "ios/fastlane/metadata/review_information/review_demo_password.txt",
  "ios/fastlane/metadata/review_information/review_demo_user.txt"
];

function shouldProcessDirectory(entry) {
  return !config.upgrade.manifest.ignoreDirectories.includes(
    path.relative(process.cwd(), entry)
  );
}

function templatizePath(file) {
  if (IGNORE_TEMPLATIZE.includes(file.substring(file.indexOf(path.sep) + 1))) {
    return file;
  }

  return file.replace(
    config.demo.placeholderNameRegex,
    config.upgrade.manifest.slugPlaceholder
  );
}

function getFileType(file) {
  switch (true) {
    case /\.(c|m)?(t|j)sx?$/.test(file):
      return "babel";
    case /\.json$/.test(file):
      return "json";
    default:
      return "text";
  }
}

function getAllFiles(directory, relative, accumulator = []) {
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
}

export function generateManifest(previous, next) {
  const filesOnPreviousVersion = getAllFiles(previous, previous);
  const files = getAllFiles(next, next);

  /**
   * When a file doesn't exist on the previous version and is introduced in the
   * next version then classify it's type as "addition"
   */
  files.forEach((file) => {
    if (!filesOnPreviousVersion.find((f) => f.path === file.path)) {
      file.type = "addition";
    }
    file.path = file.path.substring(file.path.indexOf(path.sep) + 1);
  });

  return files;
}
