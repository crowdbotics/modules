#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const customFiles = path.join(cwd, "custom");
const { execSync } = require("child_process");

// docs
fs.copyFileSync(path.join(customFiles, "README.md"), path.join(cwd, "README.md"));

// Crowdbotics modules, store and screens files
fs.renameSync(path.join(customFiles, "modules"), path.join(cwd, "modules"));
fs.renameSync(path.join(customFiles, "screens"), path.join(cwd, "screens"));
fs.renameSync(path.join(customFiles, "store"), path.join(cwd, "store"));
fs.renameSync(path.join(customFiles, "public"), path.join(cwd, "public"));
fs.copyFileSync(path.join(customFiles, "App.js"), path.join(cwd, "App.js"));

// CircleCI
fs.renameSync(path.join(customFiles, ".circleci"), path.join(cwd, ".circleci"));

// File overrides
fs.copyFileSync(path.join(customFiles, "babel.config.js"), path.join(cwd, "babel.config.js"));
fs.copyFileSync(path.join(customFiles, "heroku.yml"), path.join(cwd, "heroku.yml"));
fs.copyFileSync(path.join(customFiles, "metro.config.js"), path.join(cwd, "metro.config.js"));
fs.copyFileSync(path.join(customFiles, ".eslintrc.js"), path.join(cwd, ".eslintrc.js"));
fs.copyFileSync(path.join(customFiles, ".prettierrc.js"), path.join(cwd, ".prettierrc.js"));
fs.copyFileSync(path.join(customFiles, "config-overrides.js"), path.join(cwd, "config-overrids.js"));
fs.copyFileSync(path.join(customFiles, "package.json"), path.join(cwd, "package.json"));

// dotenv
fs.copyFileSync(path.join(customFiles, ".env"), path.join(cwd, ".env"));
fs.copyFileSync(path.join(customFiles, ".env.template"), path.join(cwd, ".env.template"));

// rubygems
fs.copyFileSync(path.join(customFiles, "Gemfile"), path.join(cwd, "Gemfile"));
fs.copyFileSync(path.join(customFiles, "Gemfile.lock"), path.join(cwd, "Gemfile.lock"));

// native files
execSync(`cp -r ${path.join(customFiles, "android")} ${path.join(cwd)}`);
execSync(`cp -r ${path.join(customFiles, "ios")} ${path.join(cwd)}`);

// react-native cli bug?
// https://github.com/react-native-community/cli/blob/641b21f583c97e3d48ce87d5fe804f42db92fa5c/packages/cli/src/tools/generator/copyProjectTemplateAndReplace.ts#L144
fs.renameSync(path.join(cwd, "_editorconfig"), path.join(cwd, ".editorconfig"))

// package.json manipulation
const packageFile = path.join(cwd, "package.json");
const packageJson = require(packageFile);
const dependencies = require(path.join(customFiles, "dependencies.json"));
packageJson.dependencies = Object.assign(packageJson.dependencies, dependencies.dependencies);
packageJson.devDependencies = Object.assign(packageJson.devDependencies, dependencies.devDependencies);
fs.writeFileSync(packageFile, JSON.stringify(packageJson, null, 2));

// Cleanup
fs.rmdirSync(path.join(customFiles), { recursive: true });
