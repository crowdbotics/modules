import React from "react"
import * as modsOpts from "glob:../modules/**/options.js"

const globalOptions = {
  name: "HelloWorldIdentifier",
  url: "https://HelloWorldIdentifier.botics.co",
  api: "https://HelloWorldIdentifier.botics.co/api/v1"
}

const getopts = opts => {
  let temp = {}
  for (const [name, definition] of Object.entries(opts)) {
    let key = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
    temp[key] = definition
  }
  return temp
}

const options = getopts(modsOpts)

export function getOptions(component) {
  return options[component.name] || {}
}

export const OptionsContext = React.createContext(options)
export const GlobalOptionsContext = React.createContext(globalOptions)
