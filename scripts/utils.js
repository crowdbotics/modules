export const generateCommand = (str) => str.join(" ");

const VALID_MARK = "\u2705";
const INVALID_MARK = "\u274C";
const WARNING_MARK = "\u26A0";

export const valid = (...args) => {
  console.log(VALID_MARK, ...args);
};

export const invalid = (...args) => {
  console.error(INVALID_MARK, ...args);
  process.exit(1);
};

export const warn = (...args) => {
  console.log(WARNING_MARK, ...args);
};

export const section = (...args) => {
  console.log("");
  console.log(">", ...args);
};
