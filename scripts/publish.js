/* eslint-disable camelcase */
import inquirer from "inquirer";
import { invalid, section } from "../utils.js";
import ora from "ora";
import { apiClient } from "./utils/apiClient.js";

const POLL_INTERVAL = 2000;

export const publish = async () => {
  section("Publishing modules.");
  section(
    "Please ensure Crowdbotics has permission to commit to your linked repository."
  );

  let defaultOrganization;

  const preparingSpinner = ora("Preparing").start();
  try {
    const response = await apiClient.get({
      path: "/v2/user/"
    });

    const userBody = await response.json();

    if (userBody.organization) {
      defaultOrganization = userBody.organization;
    }
  } catch {
    invalid("Unable to get current user. Please login and try again.");
    return;
  } finally {
    preparingSpinner.stop();
  }

  if (!defaultOrganization) {
    invalid(
      "Current user does not belong to an organization. Please join an organization before publishing modules."
    );
  }

  const { ok } = await inquirer.prompt({
    message: `Modules will be published under organization '${defaultOrganization.name}'. Please confirm this is expected (y/n):`,
    name: "ok",
    type: "input"
  });

  if (ok.trim().toLowerCase() !== "y") {
    invalid("Cancelling operation. No module has been published.");
    return;
  }

  const { git_url, branch } = await inquirer.prompt([
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
    }
  ]);

  const spinner = ora("Publishing Module").start();

  const createResult = await apiClient.post({
    path: "/v2/publish-module-to-catalog/",
    body: {
      git_url,
      branch,
      org_id: defaultOrganization.id,
      is_private: true
    }
  });

  if (!createResult.ok) {
    invalid("Unable to publish module to catalog.");
  }

  const taskResult = (await createResult.json()).task_result;

  while (true) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, POLL_INTERVAL);
    });

    const processingResult = await apiClient.get({
      path: "/v2/status-of-published-module/" + taskResult.task_id
    });

    const processingResultBody = await processingResult.json();
    if (!processingResultBody || processingResultBody.status !== "PENDING") {
      break;
    }
  }

  spinner.stop();

  // TODO - print publish success message.
};
