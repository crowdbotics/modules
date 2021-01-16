import fs from "fs";
import path from "path";
import child_process from "child_process";

const APP_NAME = "demo";
const template = path.join("file:/", process.cwd(), "template");

function clean({ target }) {
  fs.rmdirSync(path.join(process.cwd(), target), { recursive: true });
}

function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    child_process.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      } else if (stdout) {
        console.log(stdout);
      } else {
        console.log(stderr);
      }
      resolve(stdout ? true : false);
    });
  });
}


clean({ target: APP_NAME });
execShellCommand(`npx react-native init ${APP_NAME} --template ${template}`);
