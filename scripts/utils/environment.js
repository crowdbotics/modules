import { execSync, spawnSync } from "node:child_process";
import { invalid, section, valid } from "../../utils.js";

const PYTHON_VERSION_REGEX = /Python (3\.[0-9]*)/;


const userdir = process.cwd();

export const execOptions = { encoding: "utf8", stdio: "inherit" };

/**
 * Setup Python environment to desired version
 * @param {*} options: exec options
 */
export function configurePython(options = execOptions) {
  execSync("pipenv --python 3.8.17", options);
}

// TODO - Remove this
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

function formatStdout(stdout) {
  return stdout.replace(/\n/g, "")
}

const EnvironmentDependency = {
  Yarn: "yarn",
  Git: "git",
  Python: "python",
  PipEnv: "pipenv",
  CookieCutter: "cookiecutter",
}

export function getEnvironmentVersions(dependencies) {
  const environmentVersions = {};

  if(dependencies.includes(EnvironmentDependency.Yarn)) {
    const yarn = spawnSync("yarn", ["--version"], {
      cwd: userdir,
      shell: true,
      encoding: "utf8"
    });

    if(!yarn.error && !yarn.stderr) {
      environmentVersions.yarn = formatStdout(yarn.stdout);
    } 
  }

  if(dependencies.includes(EnvironmentDependency.Git)) {
    const git = spawnSync("git", ["--version"], {
      cwd: userdir,
      shell: true,
      encoding: "utf8"
    });

    if(!git.error && !git.stderr) {
      environmentVersions.git = formatStdout(git.stdout);
    } 
  }

  if(dependencies.includes(EnvironmentDependency.Python)) {
    const python = spawnSync("python", ["--version"], {
      cwd: userdir,
      shell: true,
      encoding: "utf8"
    });

    if(python.stdout && !python.error && !python.stderr) {
      const versionMatch = python.stdout.match(PYTHON_VERSION_REGEX);
  
      if(versionMatch && versionMatch[1]) {
        environmentVersions.python = versionMatch[1]
      }
    }
  }

  if(dependencies.includes(EnvironmentDependency.PipEnv)) {
    const pipenv = spawnSync("pipenv", ["--version"], {
      cwd: userdir,
      shell: true,
      encoding: "utf8"
    });

    if(!pipenv.stderr && !pipenv.error) {
      environmentVersions.pipenv = formatStdout(pipenv.stdout);
    } 
  }
 
  if(EnvironmentDependency.CookieCutter) {
    const cookiecutter = spawnSync("cookiecutter --version", {
      cwd: userdir,
      shell: true,
      encoding: "utf8"
    });
  
    if(!cookiecutter.stderr && !cookiecutter.error) {
      environmentVersions.cookiecutter = cookiecutter.stdout;
    }
  }

  return environmentVersions;
}

export function validateEnvironmentDependencies(dependencies = [EnvironmentDependency.Yarn, EnvironmentDependency.Git, EnvironmentDependency.Python, EnvironmentDependency.PipEnv, EnvironmentDependency.CookieCutter]) {
  const environmentVersions = getEnvironmentVersions(dependencies);

  section("Scaffold upgrade started");
  section("Checking environment compatibility");

  if(dependencies.includes(EnvironmentDependency.Yarn)) {
    if (!environmentVersions.yarn) {
      invalid("yarn is not available in your system");
    } else {
      valid("yarn version", environmentVersions.yarn);
    }
  }

  if(dependencies.includes(EnvironmentDependency.Git)) {
    if (!environmentVersions.git) {
      invalid("git is not available in your system");
    } else {
      valid(environmentVersions.git);
    }
  }

  if(dependencies.includes(EnvironmentDependency.Python)) {
    if (!environmentVersions.python) {
      invalid("Python 3.x is not available in your system");
    } else {
      valid(environmentVersions.python);
    }
  }

  if(dependencies.includes(EnvironmentDependency.PipEnv)) {
    if (!environmentVersions.pipenv) {
      invalid("pipenv is not available in your system");
    } else {
      valid(environmentVersions.pipenv);
    }
  }

  if(dependencies.includes(EnvironmentDependency.CookieCutter)) {
    if (!environmentVersions.cookiecutter) {
      invalid("cookiecutter is not available in your system");
    } else {
      valid(environmentVersions.cookiecutter);
    }
  }
}