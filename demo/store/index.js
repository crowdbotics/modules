import * as mods from "glob:./**/*.slice.js"

const getSlices = connectors =>
  Object.entries(connectors)
    .filter(([_, definition]) => definition.hasOwnProperty("slice"))
    .map(([_, definition]) => [definition.slice.name, definition.slice])

export const connectors = getSlices(mods)
