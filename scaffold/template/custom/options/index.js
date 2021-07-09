import React from "react"
import * as modsOpts from "glob:../modules/**/options.js"
import { modulesOptions, globalOptions } from "./options"

const parseOpts = opts => {
  let temp = {}
  for (const [name, definition] of Object.entries(opts)) {
    let key = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
    temp[key] = definition
  }
  return temp
}

const options = parseOpts(modsOpts)

export function getOptions(component) {
  let target = options[component.name] || {}
  let source = modulesOptions[component.name] || {}
  return Object.assign(target, source)
}

export function getGlobalOptions() {
  return globalOptions
}

export const OptionsContext = React.createContext(options)
export const GlobalOptionsContext = React.createContext(globalOptions)
