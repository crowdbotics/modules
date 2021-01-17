import { modules } from "./manifest.js";
import { getPropertyMap } from "./utils.js";

export const reducers = getPropertyMap(modules, "reducer");
export const reducers = getPropertyMap(modules, "actions");
export default getPropertyMap(modules, "screen");
