const webpack = require("webpack")

module.exports = function override(config, env) {
  config.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== "production"
    })
  )

  config.module.rules[1].oneOf[3].options.presets.push([
    "module:metro-react-native-babel-preset"
  ])

  return config
}
