/* eslint-disable camelcase */
import inquirer from "inquirer";
import { invalid, section, valid } from "../utils.js";
import ora from "ora";
import { apiClient } from "./utils/apiClient.js";

const POLL_INTERVAL = 2000;

const IN_PROGRESS_STATUSES = ["PENDING", "STARTED"];

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

      // TODO - ask the BE to supply a 400 when there's a regular failure?
      if (processingResult.status === 500) {
        const result = await processingResult.text();
        invalid(`
Crowdbotics CLI has encountered an error while waiting for the publish command to complete. Publishing may still finish successfully, however you may contact support with reference id: '${taskId}'
Error details: ${result}
`);
      }

      invalid(
        `Crowdbotics CLI has encountered an error while waiting for the publish command to complete. Publishing may still finish successfully, however you may contact support with reference id: '${taskId}'`
      );
      break;
    }

    latestProcessingResultBody = await processingResult.json();

    // There were some instances while testing where status was coming back as undefined. This may not be an issue anymore.
    if (!latestProcessingResultBody.status) {
      waitingSpinner.stop();
      invalid(
        `Crowdbotics CLI has encountered an error while waiting for the publish command to complete. Publishing may still finish successfully, however you may contact support with reference id: '${taskId}'`
      );
    }

    // If we've reached an end state for the polling, end the polling loop.
    if (!IN_PROGRESS_STATUSES.includes(latestProcessingResultBody.status)) {
      break;
    }
  }

  waitingSpinner.stop();

  if (latestProcessingResultBody.status === "FAILURE") {
    invalid(`
    Crowdbotics CLI has encountered an error while waiting for the publish command to complete. Publishing may still finish successfully, however you may contact support with reference id: '${taskId}'
    Error details: ${JSON.stringify(latestProcessingResultBody)}
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
    invalid("Unable to publish module to catalog.");
  }

  const taskResult = await createResult.json();
  await waitForTaskToComplete(taskResult.task_id);
};
