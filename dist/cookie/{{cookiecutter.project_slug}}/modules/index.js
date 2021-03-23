import { getPropertyMap, getModules } from "./utils.js";
import { getStore } from "./store.js";
import { getNavigation } from "./navigation.js";
import * as manifest from "glob:./**/index.js";

export const modules = getModules(manifest);
export const initialRoute = modules[0].title;
export const slices = Object.entries(getPropertyMap(modules, "slice"));
export const navigators = Object.entries(getPropertyMap(modules, "navigator"));
export const hooks = Object.entries(getPropertyMap(modules, "hook"));
export const store = getStore(slices);
export const Navigation = getNavigation(navigators, initialRoute);
