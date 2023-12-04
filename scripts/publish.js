/* eslint-disable camelcase */
import inquirer from "inquirer";
import { section } from "../utils.js";
import ora from "ora";

export const publish = async (moduleName) => {
  section(`Publishing module ${moduleName}.`);

  // TODO - where to find org id? Is it user?
  const defaultOrgId = 123;

  const { git_url, branch, org_id } = await inquirer.prompt([
    {
      message: "Git URL:",
      name: "git_url",
      type: "input"
    },
    {
      message: "Branch Name:",
      name: "branch",
      type: "input",
      default: "master"
    },
    {
      message: "Org ID:",
      name: "org_id",
      type: "input",
      default: defaultOrgId
    }
  ]);

  const spinner = ora("Publishing Module").start();

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });

  spinner.stop();

  section(`
Dummy publish module is complete..
Module Name: ${moduleName}
Git URL: ${git_url}
branch: ${branch}
Org ID: ${org_id}
  `);
};
