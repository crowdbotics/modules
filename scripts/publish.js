/* eslint-disable camelcase */
import inquirer from "inquirer";
import { invalid, section, valid } from "../utils.js";
import ora from "ora";
import { apiClient } from "./utils/apiClient.js";
import { printServerFieldValidationErrors } from "./utils/response.js";

const POLL_INTERVAL = 2000;

const IN_PROGRESS_STATUSES = ["CREATED", "STARTED"];

const waitForTaskToComplete = async (taskId) => {
  const waitingSpinner = ora(
    "Waiting for publish to complete. This may take a few minutes.\n\n Publishing will continue if you exit here (CTRL+C)."
  ).start();

  let latestProcessingResultBody;

  // Poll indefinitely until the task is resolved.
  while (true) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, POLL_INTERVAL);
    });

    const processingResult = await apiClient.get({
      path: "/v2/status-of-published-module/" + taskId
    });

    if (!processingResult.ok) {
      waitingSpinner.stop();

      invalid(
        `Crowdbotics CLI has encountered an error while waiting for the publish command to complete. Publishing may still finish successfully, however you may contact support with reference id: '${taskId}'`
      );
      break;
    }

    latestProcessingResultBody = await processingResult.json();

    // If we've reached an end state for the polling, end the polling loop.
    if (!IN_PROGRESS_STATUSES.includes(latestProcessingResultBody.status)) {
      break;
    }
  }

  waitingSpinner.stop();

  if (latestProcessingResultBody.status === "FAILURE") {
    invalid(`
    Crowdbotics CLI has encountered an error while waiting for the publish command to complete. Publishing may still finish successfully, however you may contact support with reference id: '${taskId}'
    Error details: ${latestProcessingResultBody.reason}
    `);
  }

  if (latestProcessingResultBody.status === "SUCCESS") {
    valid(`Publish successful. Reference id ${taskId}.`);
  }
};

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
    invalid("Unable to get current user. Please try again later.");
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

  const publishSpinner = ora("Publishing Module").start();

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

  publishSpinner.stop();

  if (!createResult.ok) {
    const errorActionString = "Unable to publish module to catalog.";

    let errorBody;
    try {
      errorBody = await createResult.json();
    } catch {
      invalid(`${errorActionString} An unexpected error has occurred.`);
      return;
    }

    if (createResult.status === 400) {
      await printServerFieldValidationErrors(errorBody, errorActionString);
    } else if (createResult.status === 403) {
      invalid(
        `${errorActionString} Current user is unauthorized to publish modules.`
      );
    } else if (createResult.status === 404 && errorBody.message) {
      invalid(`${errorActionString} ${errorBody.message}`);
    } else {
      invalid(`${errorActionString} An unexpected error has occurred.`);
    }
  }

  const taskResult = await createResult.json();
  await waitForTaskToComplete(taskResult.task_id);
};
