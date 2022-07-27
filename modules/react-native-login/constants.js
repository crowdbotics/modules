import { getOptions } from "@options";
const options = getOptions("@modules/login");
export const validateEmail = new RegExp(options.validateEmail);