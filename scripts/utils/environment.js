import { execSync } from "node:child_process";
import { section } from "../../utils.js";
import fs from "node:fs";

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
    section("Checking Node version");

    const nvmrcPath = `${userdir}/.nvmrc`;
    const currentNodeVersion = fs.readFileSync(nvmrcPath, "utf8").trim();
    if (!currentNodeVersion.includes("v18")) {
      section(`Node.js v18.x is not installed. Found version: ${currentNodeVersion}. Please install Node.js v18.16.0 before running this script.`);
      process.exit(1);
    }
  } catch (error) {
    section("Node.js v18.x is not installed. Please install Node.js v18.16.0 before running this script.");
    process.exit(1);
  }

  // Check if Python 3.8.17 is installed
  if (pythonCheck) {
    try {
      section("Checking Python version");

      const pythonPath = `${userdir}/.python-version`;
      const currentPythonVersion = fs.readFileSync(pythonPath, "utf8").trim();
      if (!currentPythonVersion.includes("3.8")) {
        section(`Python 3.8.x is not installed. Found version: ${currentPythonVersion}. Please install and try again.`);
        process.exit(1);
      }
    } catch (error) {
      section("Python 3.8.x is not correctly installed. Please install and try again.");
      process.exit(1);
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
      console.error("Cookiecutter is not installed. Please install Cookiecutter before running this command.");
      process.exit(1);
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
    if (!djangoVersion.includes("3.2.23")) {
      section(`Django 3.2.23 is not installed. Found version: ${djangoVersion}. Please install Django 3.2.23 before running this script.`);
      process.exit(1);
    }
  } catch (error) {
    section("Django 3.2.23 is not installed. Please install Django 3.2.23 before running this script.");
    process.exit(1);
  }
}
