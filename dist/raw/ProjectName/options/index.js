import React from "react"
import opts from "./../modules/*/options.js";

import { modulesOptions, globalOptions } from "./options"

let options = {}

opts.map(opt => {
  options[opt.package] = opt.value
})


export function getOptions(pakage) {
  let target = options[pakage] || {}
  let source = modulesOptions[pakage] || {}
  return Object.assign(target, source)
}

export function getGlobalOptions() {
  return globalOptions
}

export const OptionsContext = React.createContext(options)
export const GlobalOptionsContext = React.createContext(globalOptions)
