#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const customFiles = path.join(cwd, "custom");
const { execSync } = require("child_process");

// Documentation
fs.copyFileSync(
  path.join(customFiles, "README.md"),
  path.join(cwd, "README.md")
);

// Crowdbotics custom directories: modules, screens, store, options and public
fs.renameSync(path.join(customFiles, "modules"), path.join(cwd, "modules"));
fs.renameSync(path.join(customFiles, "screens"), path.join(cwd, "screens"));
fs.renameSync(path.join(customFiles, "options"), path.join(cwd, "options"));
fs.renameSync(path.join(customFiles, "store"), path.join(cwd, "store"));
fs.renameSync(path.join(customFiles, "public"), path.join(cwd, "public"));

// CircleCI
fs.renameSync(path.join(customFiles, ".circleci"), path.join(cwd, ".circleci"));
// Github
fs.renameSync(path.join(customFiles, ".github"), path.join(cwd, ".github"));

// App entry point
fs.copyFileSync(path.join(customFiles, "index.js"), path.join(cwd, "index.js"));
fs.copyFileSync(path.join(customFiles, "App.js"), path.join(cwd, "App.js"));
fs.rmSync(path.join(cwd, "App.tsx"));

// File overrides
fs.copyFileSync(
  path.join(customFiles, "babel.config.js"),
  path.join(cwd, "babel.config.js")
);
fs.copyFileSync(
  path.join(customFiles, "webpack.config.js"),
  path.join(cwd, "webpack.config.js")
);
fs.copyFileSync(
  path.join(customFiles, "heroku.yml"),
  path.join(cwd, "heroku.yml")
);
fs.copyFileSync(
  path.join(customFiles, "Dockerfile"),
  path.join(cwd, "Dockerfile")
);
fs.copyFileSync(
  path.join(customFiles, "metro.config.js"),
  path.join(cwd, "metro.config.js")
);
fs.copyFileSync(
  path.join(customFiles, ".eslintrc.js"),
  path.join(cwd, ".eslintrc.js")
);
fs.copyFileSync(
  path.join(customFiles, ".prettierrc.js"),
  path.join(cwd, ".prettierrc.js")
);
fs.copyFileSync(
  path.join(customFiles, ".crowdbotics.json"),
  path.join(cwd, ".crowdbotics.json")
);
fs.copyFileSync(
  path.join(customFiles, "package.json"),
  path.join(cwd, "package.json")
);
fs.copyFileSync(
  path.join(customFiles, "yarn.lock"),
  path.join(cwd, "yarn.lock")
);
fs.copyFileSync(
  path.join(customFiles, ".gitignore"),
  path.join(cwd, ".gitignore")
);

// environment variables files
fs.copyFileSync(
  path.join(customFiles, ".env.template"),
  path.join(cwd, ".env.template")
);

// rubygems
fs.copyFileSync(path.join(customFiles, "Gemfile"), path.join(cwd, "Gemfile"));
fs.copyFileSync(
  path.join(customFiles, "Gemfile.lock"),
  path.join(cwd, "Gemfile.lock")
);

// platform specific files
execSync(`cp -r ${path.join(customFiles, "android")} ${path.join(cwd)}`);
execSync(`cp -r ${path.join(customFiles, "ios")} ${path.join(cwd)}`);

// package.json update
// Install custom dependencies and devDependencies maintained in
// custom/dependencies.json
const packageFile = path.join(cwd, "package.json");
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
fs.rmSync(path.join(customFiles), { recursive: true });
