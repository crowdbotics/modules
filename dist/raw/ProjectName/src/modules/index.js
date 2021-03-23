import { getPropertyMap, getModules } from "./utils.js";
import * as manifest from "glob:./**/index.js";

const modules = getModules(manifest);

export const slices = Object.entries(
  getPropertyMap(modules, "slice")
);
export const navigators = Object.entries(
  getPropertyMap(modules, "navigator")
);
export const hooks = Object.entries(
  getPropertyMap(modules, "hook")
);

export const initialRoute = modules[0].title;

export default getModules;
