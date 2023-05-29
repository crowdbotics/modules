import { spawnSync } from "node:child_process";

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

console.log(stdout);

if (!stdout.includes("version")) {
  console.error(
    "Expected a scaffold version change to be included in this PR."
  );
  process.exit(1);
}

const lines = stdout.split("\n");
const numbers = lines
  .filter((line) => line.includes("version"))
  .map((line) => line.replace(/[^0-9]*/g, ""));

if (numbers[1] < numbers[0]) {
  console.error("Expected scaffold version to be higher in this PR.");
  process.exit(1);
} else if (numbers[1] > numbers[0]) {
  console.log("Expected scaffold version change was found.");
}
