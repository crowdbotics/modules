import { execSync, spawnSync } from "node:child_process";
import { invalid, section } from "../../utils.js";

const userdir = process.cwd();

export const execOptions = { encoding: "utf8", stdio: "inherit" };

/**
 * Setup Python environment to desired version
 * @param {*} options: exec options
 */
export function configurePython(options = execOptions) {
  execSync("pipenv --python 3.8.17", options);
}

export function preExecuteChecks(cookiecutterCheck = false) {
  // Check if Python 3.8.x is installed

  try {
    section("Checking Python version");

    const pythonVersionRegex = /Python 3\.[0-9]*/;

    const pythonCheck = spawnSync("python", ["--version"], {
      cwd: userdir,
      shell: true,
      encoding: "utf8"
    });
    const userPythonVersion = pythonCheck.stdout || pythonCheck.stderr;
    if (!pythonVersionRegex.test(userPythonVersion)) {
      invalid(`Found Python version: ${userPythonVersion}. Please install 3.x and try again.`);
    }
  } catch (error) {
    invalid("Error detecting python version, please check install and try again.");
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
