import fs, { existsSync } from "fs";
import path from "path";
import { invalid, section } from "../utils.js";
import { execSync } from "child_process";
import { pyprojectToml, setupPy } from "./utils/constants.js";
import { execOptions, configurePython } from "./utils/environment.js";

function generateMeta(name, type) {
  const rootMap = {
    all: "/",
    "react-native": `/modules/${name}`,
    django: "/backend/modules"
  };

  const meta = {
    title: name,
    description: "",
    root: rootMap[type],
    schema: {}
  };

  return meta;
}

function generateRNFiles(base, name, relative = "/") {
  const packageJson = `{
  "name": "@modules/${name}",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "main": "index.js"
}`;

  const indexJs = `import React from "react";
import { View } from "react-native";

function ${name}() {
  return <View>${name}</View>
}

export default {
  title: "${name}",
  navigator: ${name}
};`;

  if (relative !== "/") {
    fs.mkdirSync(path.join(base, relative), {
      recursive: true
    });
  }
  fs.writeFileSync(
    path.join(base, relative, "package.json"),
    packageJson,
    "utf8"
  );
  fs.writeFileSync(path.join(base, relative, "index.js"), indexJs, "utf8");
}

function generateDjangoFiles(base, name, relative = "/") {
  const sanitizedName = name.replaceAll("-", "_");
  const djangoName = `django_${sanitizedName}`;
  const basePath = path.join(base, relative, djangoName);

  fs.mkdirSync(basePath, { recursive: true });
  execSync(`cd ${basePath}`, execOptions);
  configurePython();
  execSync("pipenv install django==3.2.23", execOptions);
  execSync(
    `pipenv run django-admin startapp ${sanitizedName} ${basePath}`,
    execOptions
  );
  fs.writeFileSync(
    path.join(base, relative, djangoName, "setup.py"),
    setupPy(sanitizedName),
    "utf8"
  );
  fs.writeFileSync(
    path.join(base, relative, djangoName, "pyproject.toml"),
    pyprojectToml,
    "utf8"
  );
}

export function createModule(name, type, target = "modules") {
  const slugMap = {
    all: name,
    "react-native": `react-native-${name}`,
    django: `django-${name}`
  };
  const slug = slugMap[type];
  const dir = path.join(process.cwd(), target, slug);
  try {
    if (!Object.prototype.hasOwnProperty.call(slugMap, type)) {
      invalid(`invalid module type provided: ${type}`);
    }
    if (existsSync(dir)) invalid(`module named "${slug}" already exists`);

    const meta = generateMeta(name, type);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "meta.json"),
      JSON.stringify(meta, null, 2),
      "utf8"
    );

    section(`generating ${name} module (${type})`);
    switch (type) {
      case "all":
        generateDjangoFiles(dir, name, "/backend/modules");
        generateRNFiles(dir, name, `/modules/${name}`);
        break;
      case "react-native":
        generateRNFiles(dir, name);
        break;
      case "django":
        generateDjangoFiles(dir, name);
        break;
    }
  } catch (error) {
    if (existsSync(dir)) {
      fs.rmSync(dir, { recursive: true });
    }
    throw error;
  }
}
