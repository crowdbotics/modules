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

  const preparingSpinner = ora("Preparing").start();

  // First, get the user's current organization. Modules must be published to one org id.
  // If a user is not part of an organization, they cannot run this command right now
  let defaultOrganization;
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

  // Verify that the user understands which organization the modules are being published to.
  const { ok } = await inquirer.prompt({
    message: `Modules will be published under organization '${defaultOrganization.name}'. Please confirm this is expected (y/n):`,
    name: "ok",
    type: "input"
  });

  if (ok.trim().toLowerCase() !== "y") {
    invalid("Cancelling operation. No module has been published.");
    return;
  }

  // Begin collecting info related to the modules themselves.
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

  // Publishing to module is an async operation. The following API request adds a task to an async
  // queue. We will perform the publish operation, and then poll for the operation to complete.
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

  const taskResult = await createResult.json();

  // Poll indefinitely until the task is resolved.
  while (true) {
    // TODO - we should tell the user they can exit here and the task will still be processed
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, POLL_INTERVAL);
    });

    const processingResult = await apiClient.get({
      path: "/v2/status-of-published-module/" + taskResult.task_id
    });

    if (!processingResult.ok) {
      if (processingResult.status === 500) {
        const result = await processingResult.json();
        invalid("Error publishing module. Server responded with: " + result);
      }

      invalid("Error publishing module.");
      break;
    }

    const processingResultBody = await processingResult.json();
    if (!processingResultBody || processingResultBody.status !== "PENDING") {
      break;
    }
  }

  spinner.stop();

  // TODO - print publish success message.
};
