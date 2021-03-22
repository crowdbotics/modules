#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const customFiles = path.join(cwd, "custom");

// Crowdbotics src files
fs.renameSync(path.join(customFiles, "src"), path.join(cwd, "src"));

// CircleCI
fs.renameSync(path.join(customFiles, ".circleci"), path.join(cwd, ".circleci"));

// File overrides
fs.copyFileSync(path.join(customFiles, "App.js"), path.join(cwd, "App.js"));
fs.copyFileSync(path.join(customFiles, "babel.config.js"), path.join(cwd, "babel.config.js"));
fs.copyFileSync(path.join(customFiles, "heroku.yml"), path.join(cwd, "heroku.yml"));
fs.copyFileSync(path.join(customFiles, "metro.config.js"), path.join(cwd, "metro.config.js"));
fs.copyFileSync(path.join(customFiles, ".env"), path.join(cwd, ".env"));
fs.copyFileSync(path.join(customFiles, ".env.template"), path.join(cwd, ".env.template"));
fs.copyFileSync(path.join(customFiles, "Gemfile"), path.join(cwd, "Gemfile"));
fs.copyFileSync(path.join(customFiles, "Gemfile.lock"), path.join(cwd, "Gemfile.lock"));

// react-native cli bug?
// https://github.com/react-native-community/cli/blob/641b21f583c97e3d48ce87d5fe804f42db92fa5c/packages/cli/src/tools/generator/copyProjectTemplateAndReplace.ts#L144
fs.renameSync(path.join(cwd, "_editorconfig"), path.join(cwd, ".editorconfig"))

// package.json manipulation
const packageFile = path.join(cwd, "package.json");
const packageJson = require(packageFile);
const dependencies = require(path.join(customFiles, "dependencies.json"));
packageJson.dependencies = Object.assign(packageJson.dependencies, dependencies);
fs.writeFileSync(packageFile, JSON.stringify(packageJson, null, 2));

// Cleanup
fs.rmdirSync(path.join(customFiles), { recursive: true });
