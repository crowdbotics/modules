import { spawnSync, execSync } from "node:child_process";
import { section } from "../../utils.js";

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
  // Check if Node.js v18.16.0 is installed
  try {
    section("Checking Node version");
    const nodeVersion = execSync("node --version", {
      cwd: userdir,
      shell: true,
      encoding: "utf8"
    }).trim();
    if (!nodeVersion.includes("v18.16.0")) {
      section(`Node.js v18.16.0 is not installed. Found version: ${nodeVersion}. Please install Node.js v18.16.0 before running this script.`);
      process.exit(1);
    }
  } catch (error) {
    section("Node.js v18.16.0 is not installed. Please install Node.js v18.16.0 before running this script.");
    process.exit(1);
  }

  // Check if Python 3.8.17 is installed
  if (pythonCheck) {
    try {
      section("Checking Python version");
      // Fallback is for older versions of Python and is why we used spawnSync. We can use execSync if this distinction really doesn't matter.
      const pythonVersion = spawnSync("python", ["--version"], {
        cwd: userdir,
        shell: true,
        encoding: "utf8"
      }).stdout || spawnSync("python", ["--version"], { shell: true, encoding: "utf8" }).stderr;
      if (!pythonVersion.includes("3.8")) {
        section(`Python 3.8 is not installed. Found version: ${pythonVersion}. Please install and try again.`);
        process.exit(1);
      }
    } catch (error) {
      section("Python 3.8 is not correctly installed. Please install and try again.");
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
      console.error("Cookiecutter is not installed. Please install Cookiecutter before running this script.");
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
