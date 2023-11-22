/**
 * Python files
 */
export const setupPy = (name) => `from setuptools import setup
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

export const pyprojectToml = `[build-system]
requires = ["setuptools"]
build-backend = "setuptools.build_meta"`;

/**
 * React Native files
 */

export function generateComponentName(input) {
  return input
    .replace(/[-_]/g, " ")
    .replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
    .replace(/\s/g, "");
}

export const indexJs = (name) => {
  const componentName = generateComponentName(name);
  return `import React from "react";
import { View, Text } from "react-native";

function ${componentName}() {
  return (
    <View>
      <Text>${name}</Text>
    </View>
  );
}

export default {
  title: "${name}",
  navigator: ${componentName}
};
`;
};

export const packageJson = (name) => `{
    "name": "@modules/${name}",
    "version": "1.0.0",
    "description": "",
    "private": true,
    "main": "index.js"
  }`;

/**
 * Miscellaneous
 */
export function generateMeta(name, type) {
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
