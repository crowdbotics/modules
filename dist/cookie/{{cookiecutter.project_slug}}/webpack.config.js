/**
 * React Native for Web - webpack/babel/metro config and build
 * https://necolas.github.io/react-native-web/
 *
 * Compiles the following files and directories:
 * - index.js
 * - App.js
 * - modules
 * - options
 * - screens
 * - store
 *
 * Matches all images and js files from the paths above.
 *
 * Creates the following import aliases:
 * - react-native => react-native-web
 * - @modules => ./modules
 * - @options => ./options
 * - @screens => ./screens
 * - @store   => ./store
 *
 * Reuses the babel config from `babel.config.js`.
 *
 * You can create a new entry file specifically for web `index.web.js` - and
 * then update `babelLoaderConfiguration.include` and `module.exports.entry` to
 * use it instead.
 *
 * For web-specific code inside a common module, refer to the documentation:
 * https://necolas.github.io/react-native-web/docs/multi-platform/#web-specific-code
 */
const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const babelOptions = require("./babel.config.js")
const appDirectory = path.resolve(__dirname)

const isProduction =
  process.argv[process.argv.indexOf("--mode") + 1] === "production"

const html_template_path = isProduction
  ? "./public/django_index.html"
  : "./public/index.html"

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(appDirectory, html_template_path),
  filename: "index.html",
  inject: false
})

const DevEnvPlugin = new webpack.DefinePlugin({
  __DEV__: process.env.NODE_ENV !== "production" || true,
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
})

const JestWorkerPlugin = new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null })

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, "index.js"),
    path.resolve(appDirectory, "App.js"),
    path.resolve(appDirectory, "modules"),
    path.resolve(appDirectory, "screens"),
    path.resolve(appDirectory, "options"),
    path.resolve(appDirectory, "store"),
    path.resolve(appDirectory, "node_modules/react-native-reanimated")
  ],
  use: {
    loader: "babel-loader",
    options: babelOptions
  }
}

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
      esModule: false
    }
  }
}

const typescriptLoaderConfiguration = {
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/
}

const babelExclusionConfiguration = {
  test: /\.js$/,
  exclude:
    /node_modules\/(?!(react-native-elements|react-native-vector-icons)\/).*/,
  loader: "babel-loader"
}

const urlLoaderConfiguration = {
  test: /\.ttf$/,
  loader: "url-loader",
  include: path.resolve(__dirname, "node_modules/react-native-vector-icons")
}

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    "@babel/polyfill",
    path.resolve(appDirectory, "index.js")
  ],

  // configures where the build ends up
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(appDirectory, "backend", "web_build"),
    clean: true
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      typescriptLoaderConfiguration,
      babelExclusionConfiguration,
      urlLoaderConfiguration
    ]
  },
  plugins: [HTMLWebpackPluginConfig, DevEnvPlugin, JestWorkerPlugin],
  resolve: {
    alias: {
      "react-native$": "react-native-web",
      "@modules": path.resolve(appDirectory, "modules"),
      "@screens": path.resolve(appDirectory, "screens"),
      "@options": path.resolve(appDirectory, "options"),
      "@store": path.resolve(appDirectory, "store")
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [".web.js", ".js", ".ts", ".jsx", ".tsx"]
  }
}
