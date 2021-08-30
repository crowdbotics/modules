#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const customFiles = path.join(cwd, "custom");
const mobileDir = path.join(cwd, "mobile");
const { execSync } = require("child_process");

// Create mobile subdirectory in a app root directory
fs.mkdirSync(mobileDir);

// Custom template folders to move in a app root directory
const customFoldersToMoveRootDir = [
  ".circleci",  // CircleCI
  ".github",   // Github
];

for (let folder of customFoldersToMoveRootDir) {
  fs.renameSync(path.join(customFiles, folder), path.join(cwd, folder));
}

// Custom template files to move in a app root directory
const customFilesToMoveRootDir = [
  "README.md",  // docs
  "heroku.yml",
];

for (let file of customFilesToMoveRootDir) {
  fs.copyFileSync(path.join(customFiles, file), path.join(cwd, file));
}

// Custom template folders to move in a app mobile subdirectory
const customFoldersToMoveMobileDir = [
  "store",
  "public",
  "modules",
  "screens",
  "options",
]

for (let folder of customFoldersToMoveMobileDir) {
  fs.renameSync(path.join(customFiles, folder), path.join(mobileDir, folder));
}

//Custom template files to overrides in the mobile subdirectory
const filesToOverride = [
  ".env",
  "App.js",
  "Gemfile",
  "package.json",
  "Gemfile.lock",
  ".eslintrc.js",
  ".env.template",
  ".prettierrc.js",
  "babel.config.js",
  "metro.config.js",
  ".crowdbotics.json",
  "config-overrides.js",
];

for (let file of filesToOverride) {
  fs.copyFileSync(
    path.join(customFiles, file),
    path.join(mobileDir, file)
  );
}

// Move required template files from app root directory to mobile subdirectory
const requiredRootTemplateFiles = [
  "app.json",
  "index.js",
  ".gitignore",
  ".flowconfig",
  ".buckconfig",
  ".editorconfig",
  ".gitattributes",
  ".watchmanconfig",
];

for (let file of requiredRootTemplateFiles) {
  fs.renameSync(path.join(cwd, file), path.join(mobileDir, file));
}

// Copy all native files from custom templates directory to mobile subdirectory recursively
const nativeFiles = [
  "android",
  "ios",
];

for (let file of nativeFiles) {
  execSync(`cp -r ${path.join(customFiles, file)} ${path.join(mobileDir)}`);
}

// Copy required template files from app root directory to mobile subdirectory recursively
const requiredRootTemplateFolders = [
  "__tests__",
];

for (let folder of requiredRootTemplateFolders) {
  execSync(`cp -r ${path.join(cwd, folder)} ${path.join(mobileDir)}`);
}

// package.json manipulation
const packageFile = path.join(mobileDir, "package.json");
const packageJson = require(packageFile);
const dependencies = require(path.join(customFiles, "dependencies.json"));
packageJson.dependencies = Object.assign(
  packageJson.dependencies,
  dependencies.dependencies
);
packageJson.devDependencies = Object.assign(
  packageJson.devDependencies,
  dependencies.devDependencies
);
fs.writeFileSync(packageFile, JSON.stringify(packageJson, null, 2));

// Cleanup
fs.rmdirSync(path.join(customFiles), { recursive: true });

//Cleanup template files and folders in root directory
const templateFilesToRemove = [
  "App.js",
  ".prettierrc.js",
  ".eslintrc.js",
  "metro.config.js",
  "babel.config.js",
  "package.json"
];

// Remove template files from app root directory
for (let file of templateFilesToRemove) {
  fs.unlinkSync(path.join(cwd, file));
}

// Remove template folders from app root directory
const templateFoldersToRemove = [
  "android",
  "ios",
  "__tests__",
  "node_modules"
];

for (let folder of templateFoldersToRemove) {
  fs.rmdirSync(path.join(cwd, folder), { recursive: true });
}