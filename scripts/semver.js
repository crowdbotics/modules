/**
 * Compares the latest master .crowdbotics.json file with the current
 * .crowdbotics.json file "version" property and ensures it has been
 * increased. Also checks whether the scaffold package.json matches that
 * same new version.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { valid, invalid } from "../config.js";

const __dirname = process.cwd();

const { stdout } = spawnSync(
  "git",
  [
    "diff",
    "--cached",
    "--unified=0",
    "origin/master",
    "--",
    "scaffold/template/custom/.crowdbotics.json"
  ],
  {
    cwd: __dirname,
    encoding: "utf8"
  }
);

valid(".crowdbotics.json was found.", "\n", stdout);

if (!stdout.includes("version")) {
  invalid("Expected a scaffold version change to be included in this PR.");
}

const onlyNumbersRegex = /[^0-9]*/g;

const lines = stdout.split("\n");
const numbers = lines
  .filter((line) => line.includes("version"))
  .map((line) => line.replace(onlyNumbersRegex, ""));

if (numbers[1] < numbers[0]) {
  invalid("Expected scaffold version to be higher in this PR.");
} else if (numbers[1] > numbers[0]) {
  valid("Expected scaffold version change was found.");
  const templateVersion = JSON.parse(
    fs.readFileSync(path.join("scaffold", "package.json"), "utf8")
  ).version.replace(onlyNumbersRegex, "");
  if (numbers[1] === templateVersion) {
    valid(
      "scaffold/package.json version matches scaffold/template/custom/.crowdbotics.json version."
    );
  } else {
    invalid(
      "Expected scaffold/package.json version to match scaffold/template/custom/.crowdbotics.json version."
    );
  }
}
