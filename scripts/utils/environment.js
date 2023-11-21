import { execSync } from "child_process";

export const execOptions = { encoding: "utf8", stdio: "inherit" };

/**
 * Setup Python environment to desired version
 * @param {*} options: exec options
 */
export function configurePython(options = execOptions) {
  execSync("pipenv --python 3.8.17", options);
}
