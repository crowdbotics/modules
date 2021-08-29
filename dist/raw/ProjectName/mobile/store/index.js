import * as mods from "glob:./**/*.slice.js"

// Minimal check to see if imported slice has all properties of an actual slice
const isValid = (slice) => {
  const sliceProps = ["actions", "caseReducers", "name", "reducer"]
  return Object.keys(slice).every(prop => sliceProps.includes(prop))
}

const getSlices = connectors =>
  Object.entries(connectors)
    .filter(([_, definition]) => definition.hasOwnProperty("slice") && isValid(definition.slice))
    .map(([_, definition]) => [definition.slice.name, definition.slice])

export const connectors = getSlices(mods)
