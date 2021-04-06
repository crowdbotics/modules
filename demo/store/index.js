import * as mods from "glob:./**/*.slice.js"

const getSlices = connectors =>
  Object.entries(connectors)
    .filter(([_, definition]) => definition.hasOwnProperty("slice"))
    .map(([_, definition]) => [definition.slice.name, definition.slice])

const getThunks = connectors => {
  let combinedThunks = {}
  for (let [_, definition] of Object.entries(connectors)) {
    Object.entries(definition).map(([key, value]) => {
      if (key !== "slice") combinedThunks[key] = value
    })
  }
  return combinedThunks
}

export const connectors = getSlices(mods)
export const thunks = getThunks(mods)
