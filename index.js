#!/usr/bin/env node
/**
 * Crowdbotics Modules tool
 *
 * Run it anywhere with: npx crowdbotics/modules
 *
 * Commands available:
 * - parse
 */
import arg from "arg";
import fs from "node:fs";
import path from "node:path";
import { parseModules } from "./scripts/parse.js";
import { valid, invalid, section } from "./scripts/utils.js";

//import { parseModules } from "./scripts/parse.js";

const userdir = process.cwd();

function dispatcher() {
  const command = process.argv[2];

  if (!Object.prototype.hasOwnProperty.call(commands, command)) {
    throw new Error(`command doesn't exist: ${command}`);
  }

  commands[command]();
}

const commands = {
  parse: () => {
    const args = arg({
      "--source": String,
      "--write": String
    });
    if (!args["--source"]) {
      throw new Error("missing required argument: --source");
    }
    if (!args["--out"]) {
    }
    const data = parseModules(path.join(args["--source"]));
    if (args["--write"] && process.exitCode !== 1) {
      fs.writeFileSync(
        path.join(args["--write"]),
        JSON.stringify(data, null, 2),
        "utf8"
      );
    }
  }
};

try {
  dispatcher();
} catch (err) {
  invalid(err.message);
}
