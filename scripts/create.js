import fs, { existsSync } from "fs";
import path from "path";
import { invalid, section } from "../utils.js";

function generateMeta(name, type) {
  const rootMap = {
    all: "/",
    "react-native": "/modules",
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
  const setupPy = `from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_${name}",
    version="0.1",
    packages=["${name}"],
    install_requires=[],
    cmdclass={"build": BuildCommand},
)`;

  const pyprojectToml = `[build-system]
requires = ["setuptools"]
build-backend = "setuptools.build_meta"`;

  const djangoName = `django_${name.replace("-", "_")}`;
  fs.mkdirSync(path.join(base, relative, djangoName, name), {
    recursive: true
  });
  fs.writeFileSync(
    path.join(base, relative, djangoName, "setup.py"),
    setupPy,
    "utf8"
  );
  fs.writeFileSync(
    path.join(base, relative, djangoName, "pyproject.toml"),
    pyprojectToml,
    "utf8"
  );
  fs.writeFileSync(
    path.join(base, relative, djangoName, name, "__init__.py"),
    "",
    "utf8"
  );
}

export function createModule(name, type, target = "modules") {
  const slugMap = {
    all: name,
    "react-native": `react-native-${name}`,
    django: `django-${name}`
  };

  if (!Object.prototype.hasOwnProperty.call(slugMap, type)) {
    invalid(`invalid module type provided: ${type}`);
  }
  const slug = slugMap[type];
  const dir = path.join(process.cwd(), target, slug);
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
      generateDjangoFiles(dir, name, `/backend/modules/${name}`);
      generateRNFiles(dir, name, `/modules/${name}`);
      break;
    case "react-native":
      generateRNFiles(dir, name);
      break;
    case "django":
      generateDjangoFiles(dir, name);
      break;
  }
}
