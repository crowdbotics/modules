import { getPropertyMap, getModules } from "./utils.js";
import * as mods from "glob:./**/index.js";
import { screens } from "@screens";

export const modules = getModules(mods);
export const initialRoute = modules[0].title;
export const slices = Object.entries(getPropertyMap(modules, "slice"));
export const navigators = Object.entries(getPropertyMap(modules, "navigator"));
export const hooks = Object.entries(getPropertyMap(modules, "hook"));

export function getNavigationScreen(name) {
    const screen = screens.find(x => x[0].includes(name))

  if(screen){
    return screen[0]
  }

  return name
}