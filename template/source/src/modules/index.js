import { modules } from "./manifest.js";
import { getPropertyMap } from "./utils.js";

export const reducers = getPropertyMap(modules, "reducer");
export const actions = getPropertyMap(modules, "actions");
export const screens = getPropertyMap(modules, "screen");
export default modules;
