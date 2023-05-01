#!/usr/bin/env node
import path from "node:path";
import inquirer from "inquirer";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const actions = {
  ["Quit"]: () => process.exit(1),
  ["Upgrade my scaffold"]: () => {
    console.log("Stashing local changes");
    spawn("git", ["stash", "-u"], {
      cwd: __dirname,
      stdio: "inherit"
    });

    console.log("scaffold upgrade started");
    process.exit(1);
  }
};

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: ["Quit", "Upgrade my scaffold"]
    }
  ])
  .then((answers) => {
    actions[answers.action]();
    process.exit(1);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error("Your environment isn't compatible.");
    } else {
      console.error(error);
    }
  });
