import { execSync, spawnSync } from "node:child_process";
import { invalid, section } from "../../utils.js";
import fs from "node:fs";
import { DJANGO_VERSION } from "./constants.js";

const userdir = process.cwd();

export const execOptions = { encoding: "utf8", stdio: "inherit" };

/**
 * Setup Python environment to desired version
 * @param {*} options: exec options
 */
export function configurePython(options = execOptions) {
  execSync("pipenv --python 3.8.17", options);
}

export function preExecuteChecks(pythonCheck = false, cookiecutterCheck = false) {
  // Check if Node.js v18.x is installed
  try {
    invalid("Checking Node version");

    const userNode = spawnSync("node", ["--version"], {
      cwd: userdir,
      shell: true,
      encoding: "utf8"
    });

    const nvmrcPath = `${userdir}/.nvmrc`;
    const systemNodeVersion = fs.readFileSync(nvmrcPath, "utf8").trim().split(".").slice(0, -2).join(".");
    if (!systemNodeVersion.includes(userNode)) {
      invalid(`Found Node version: ${userNode}. Please install Node ${systemNodeVersion} before running this command.`);
    }
  } catch (error) {
    invalid("Error detecting node version, please check install and  try again.");
  }

  // Check if Python 3.8.x is installed
  if (pythonCheck) {
    try {
      invalid("Checking Python version");

      const pythonPath = `${userdir}/.python-version`;
      const systemPython = fs.readFileSync(pythonPath, "utf8").trim().split(".").slice(0, -1).join(".");

      const userPython = spawnSync("node", ["--version"], {
        cwd: userdir,
        shell: true,
        encoding: "utf8"
      });
      if (!userPython.includes(systemPython)) {
        invalid(`Found Python version: ${userPython}. Please install ${systemPython} and try again.`);
      }
    } catch (error) {
      invalid("Error detecting python version, please check install and try again.");
    }
  }

  if (cookiecutterCheck) {
  // Check if Cookiecutter is installed
    try {
      execSync("cookiecutter --version", {
        cwd: userdir,
        shell: true,
        encoding: "utf8"
      });
    } catch (error) {
      invalid("Cookiecutter is not installed. Please install Cookiecutter before running this command.");
    }
  }
}

export function preExecuteDjangoCheck() {
  // Check if Django 3.2.23 is installed

  try {
    section("Checking Django version");
    const djangoVersion = execSync("python -m django --version", {
      cwd: userdir,
      shell: true,
      encoding: "utf8"
    }).trim();
    if (!djangoVersion.includes(DJANGO_VERSION)) {
      invalid(`Found Django version: ${djangoVersion}. Please install ${DJANGO_VERSION} before running this command.`);
    }
  } catch (error) {
    invalid("Error detecting Django version, please check install and try again.");
  }
}
