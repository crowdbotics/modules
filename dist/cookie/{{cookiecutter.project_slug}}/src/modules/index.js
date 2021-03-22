import { manifest } from "./manifest.js";
import { getPropertyMap, getModules } from "./utils.js";

export const slices = Object.entries(
  getPropertyMap(getModules(manifest), "slice")
);
export const navigators = Object.entries(
  getPropertyMap(getModules(manifest), "navigator")
);
export const hooks = Object.entries(
  getPropertyMap(getModules(manifest), "hook")
);

export const initialRoute = getModules(manifest)[0].title;

export default getModules;
