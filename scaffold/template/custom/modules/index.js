import mods from "./*/index.js"
import { getModules } from "./modules.js"

export const modules = getModules(mods)

export const slices = modules
  .filter(mod => mod.value.slice)
  .map(mod => mod.value.slice)

export const reducers = slices.reduce((acc, slice) => {
  let name = slice.name.charAt(0).toUpperCase() + slice.name.slice(1)
  acc[name] = slice.reducer
  return acc
}, {})

export const navigators = modules
  .filter(mod => mod.value.navigator)
  .map(mod => {
    return {
      name: mod.name,
      value: mod.value.navigator
    }
  })

export const hooks = modules
  .filter(mod => mod.value.hook)
  .map(mod => {
    return {
      name: mod.name,
      value: mod.value.hook
    }
  })
