/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path")
const extraNodeModules = {
  "@modules": path.resolve(__dirname, "modules"),
  "@screens": path.resolve(__dirname, "screens"),
  "@options": path.resolve(__dirname, "options")
}
const watchFolders = [
  path.resolve(__dirname, "modules"),
  path.resolve(__dirname, "screens"),
  path.resolve(__dirname, "options")
]
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from extraNodeModules to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), "node_modules", name)
    })
  },
  watchFolders,
  resetCache: true
}
