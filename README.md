# Crowdbotics Modules

This is a monorepo which holds the source code for the various modules we built,
for tracking purposes and to ease the creation of new ones. There's a complete React Native custom template in [template](template). It also includes utilities for modules installation and removal.

# Table of contents

- [Modules Available](#modules-available)
  - [Django](#django)
  - [React Native](#react-native)
- [Commands](#commands)
  - [Generate modules data JSON](#generate-modules-data-json)
  - [Create a local demo app](#create-a-local-demo-app)
  - [Install a module](#install-a-module)
  - [Remove a module](#remove-a-module)
- [Auto loading and setting up modules](#auto-loading-and-setting-up-modules)
  - [Metro config](#metro-config)
  - [Using @modules](#using-modules)
  - [Manifest](#manifest)
- [Custom React Native template](#custom-react-native-template)
  - [What's included](#whats-included)
- [Authoring Modules](#authoring-modules)
  - [package.json](#packagejson)
  - [Adding dependencies to your module](#adding-dependencies-to-your-module)
  - [Adding dependencies with Native code](#adding-dependencies-with-native-code)

# Modules Available

## Django

### [Articles](django/articles): `articles`

## React Native

### [Articles](react-native/articles): `articles`

### [Chat](react-native/chat): `chat`

| Typing                            | Message list                         | Pubnub version                       | Chats List                           |
| --------------------------------- | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| ![chat preview](preview/chat.png) | ![chat preview 2](preview/chat2.png) | ![chat preview 3](preview/chat3.png) | ![chat preview 4](preview/chat4.png) |

### [Login](react-native/login): `login`

### [Maps](react-native/maps): `maps`

### [Onboarding](react-native/onboarding): `onboarding`

### [Splash](react-native/splash): `splash`

### [Terms and Conditions](react-native/terms-and-conditions): `terms-and-conditions`

### [User Profile](react-native/user-profile): `user-profile`

# Commands

## Generate modules data JSON

```sh
npm run parse
```

Run the command to generate the JSON data, ready to be pasted in the Admin for updates or new modules creation.

In our `crowdbotics-slack-app` backend we support two flags on each file:

- `parentDir` - default to `src/features/<module_name>` if null, or use it otherwise
- `newFile` - undocumented/unimplemented?

## Create a local demo app

```sh
npm run demo
```

This command runs `npx react-native init` with [`--template`](https://github.com/react-native-community/cli/tree/master/packages/global-cli#--template) pointing to our own [Custom React Native template](#custom-react-native-template).

## Install a module

```sh
npm run demo:add <module_name>
```

Installs a module into the demo app, performing the follow operations:

1. Copies the module directory from [react-native](react-native) into `demo/src/modules`.
2. Runs `yarn add <module_name>` in the `demo` directory.
3. Runs `yarn add <dependency>` for every `x-dependencies` in the module `package.json`.
4. Adds the module to `demo/src/modules/manifest.js` - with an import and an array export.

## Remove a module

```sh
npm run demo:add <module_name>
```

Removes a module from the demo app, performing the follow operations:

1. Removes the module folder from `demo/src/modules`.
2. Runs `yarn remove <module_name>` in the `demo` directory.
3. Runs `yarn remove <dependency>` for every `x-dependencies` in the module `package.json`.
4. Remove the module from `demo/src/modules/manifest.js` - removing the import and the item from the export array.

# Auto loading and setting up modules

## Metro config

Our modules and template are written in a way that no user setup is required. We also make use of some simple scripts to update a manifest that lists the modules installed and we pick up from that to load them.

This section explains the mechanisms of this setup.

A good place to start is our `metro.config.js` config:

[template/source/metro/config.js](template/source/metro/config.js)

```javascript
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path");
const extraNodeModules = {
  "@modules": path.resolve(__dirname, "src", "modules"),
};
const watchFolders = [path.resolve(__dirname + "/src/modules")];
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from src/modules to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), "node_modules", name),
    }),
  },
  watchFolders,
};
```

We make use of the Metro's Resolver [extraNodeModules](https://facebook.github.io/metro/docs/configuration/#extranodemodules) option to make use of local `npm` libraries installed into the app's `src/modules` directory (directory where modules get installed).

This gives us three main benefits:

- **Modularity** - We can author modules as npm packages and include their own dependencies that get installed when installing the module.
- **Developer Experience** - Making changes to those files also work with the metro [hot reload](https://facebook.github.io/metro/docs/configuration/#watchfolders).
- **Imports redirects** - Because managing `node_modules` on every `src/modules` folder isn't the best user experience, we redirect any import to the main app's `node_modules`. This means that a module can import from its own files or from any library, without issues.

## Using @modules

Notice the `@modules` key above, which means that we can import `src/modules/index.js` like this:

[template/source/src/config/index.js](template/source/src/config/index.js)

```javascript
import modules from "@modules";
```

And the default export of that module is just the components themselves:

[template/source/src/modules/index.js](template/source/src/modules/index.js)

```javascript
import { modules } from "./manifest.js";
import { getPropertyMap } from "./utils.js";

export const reducers = getPropertyMap(modules, "reducer");
export const actions = getPropertyMap(modules, "actions");
export default getPropertyMap(modules, "screen"); // <-- Default export
// template/source/src/modules/utils.js
export function getPropertyMap(source, prop) {
  let map = {};
  source.map((mod) => (map[mod.name] = mod[prop]));
  return map;
}
```

The `reducers` get imported into our `store.js` setup

[template/source/src/config/store.js](template/source/src/config/store.js)

```javascript
import {
  configureStore,
  createReducer,
  combineReducers,
} from "@reduxjs/toolkit";
import { reducers } from "@modules";

const appState = {
  name: "ProjectName",
  version: "1.0.0",
};

const appReducer = createReducer(appState, (_) => {
  return appState;
});

const reducer = combineReducers({
  app: appReducer,
  ...reducers,
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
```

## Manifest

All of this dependends on the manifest defined here:

[template/source/src/modules/manifest.js](template/source/src/modules/manifest.js)

```javascript
export const modules = [];
```

This manifest dictates what modules are installed and by consequence get automatically setup with the mechanisms detailed above.

After installing the `maps` module i.e. it will look like this:

```javascript
import Maps from "./maps";
export const modules = [Maps];
```

We make use of the `babel` and the transformer `ManifestTransformer` to manipulate this file content upon module's installations or removals.

[scripts/utils.js](scripts/utils.js)

```javascript
export class ManifestTransformer {
  constructor({ add, module }) {
    this.add = add;
    this.module = module;
    this.capitalizedModule = module
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  visit(node) {
    if (this.add) {
      traverse.default(node, {
        // Push array element
        ArrayExpression: (path) => {
          let elements = path.node.elements;
          elements.push(types.identifier(this.capitalizedModule));
          path.replaceWith(types.arrayExpression(elements));
          path.skip();
        },
      });
      // Push Import
      node.program.body = [
        types.importDeclaration(
          [
            types.importDefaultSpecifier(
              types.identifier(this.capitalizedModule)
            ),
          ],
          types.stringLiteral(`./${this.module}`)
        ),
        ...node.program.body,
      ];
    } else {
      traverse.default(node, {
        // Filter array element
        ArrayExpression: (path) => {
          path.replaceWith(
            types.arrayExpression(
              path.node.elements.filter(
                (ele) => ele.name != this.capitalizedModule
              )
            )
          );
          path.skip();
        },
        // Filter import
        ImportDeclaration: (path) => {
          if (path.node.source.value == `./${this.module}`) {
            path.remove();
          }
        },
      });
    }
    return node;
  }
}
```

# Custom React Native template

**TODO**. Used in `npx react-native init`.

## What's included

Our template is on the latest React Native version (v0.63):
[template/source/package.json](template/source/package.json)

```json
  "dependencies": {
    "@reduxjs/toolkit": "^1.5.0",
    "react": "16.13.1",
    "react-native": "0.63.4",
    "react-native-dotenv": "^2.5.0",
    "react-redux": "^7.2.2",
    "redux": "^4.0.5"
  },
```

# Authoring Modules

## package.json

Your module's `main` key should always point to `index.js`. We also suggest that you name your module with a namespace prefix `@modules` like in the example below.

Your module can include its own dependencies, more on that in the following sections.

[react-native/maps/package.json](react-native/maps/package.json)

```json
{
  "name": "@modules/maps",
  "version": "1.0.0",
  "description": "## Setup",
  "private": true,
  "main": "index.js",
  "x-dependencies": {
    "react-native-maps": "0.27.1"
  },
  "author": "Crowdbotics",
  "license": "ISC"
}
```

There's a strict requirement on the format of your default export on your module's `index.js` file.

It should look like this:

```javascript
export default {
  name: "Maps",
  screen: Maps,
  reducer: null,
  actions: null,
};
```

The keys `name` and `screen` are mandatory, and `reducer` and `actions` are optional.
We use this format to "auto-import" every module into the app automatically.

## Adding dependencies to your module

If you want to include libraries that your module depends upon and imports from, just include those as regular dependencies in the `package.json`.

```sh
npm install <dependency> -- save
```

Whenever the module gets the installed the dependencies of your module get installed in the app via npm's sub-dependencies.

If your library includes native code or depends on the [React Native's autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) feature please read the section below too.

## Adding dependencies with Native code

[React Native's autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) doesn't work yet with NPM's sub-dependencies.

Example, including `react-native-maps` in the maps module will not link the native
modules properly and results in

```
[Sat Jan 16 2021 16:23:45.446]  ERROR    Invariant Violation: requireNativeComponent: "AIRMap" was not found in the UIManager.
```

https://github.com/react-native-community/cli/issues/1347
https://github.com/react-native-maps/react-native-maps/issues/3427#issuecomment-627135604

In order to include `react-native-maps` in your module, simply move the dependency from "dependencies" to "x-dependencies" in your module's `package.json`. Those will be installed alongside the app's "dependencies" avoiding the limitation above.
