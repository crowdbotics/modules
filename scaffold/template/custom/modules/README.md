# @modules

## Table of contents

- [App Menu module](#app-menu-module)
- [Metro config](#metro-config)
- [Using @modules](#using-modules)

## App Menu module

We provide a module called "App Menu" that automatically lists available routes:

| Chat and Maps installed                         | No modules installed                        |
| ----------------------------------------------- | ------------------------------------------- |
| ![Modules preview](/preview/appmenumodules.png) | ![No modules preview](/preview/appmenu.png) |

```javascript
function AppMenu({ navigation }) {
  const routes = useNavigationState(state =>
    state.routeNames.filter(name => name !== "App Menu")
  )
  const links = routes.map(route => {
    return (
      <Pressable
        onPress={() => navigation.navigate(route)}
        style={pressed}
        key={route}
      >
        <Text style={styles.buttonText}>{route}</Text>
      </Pressable>
    )
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Routes available ({routes.length})</Text>
      {links}
    </View>
  )
}
```

## Metro config

Our modules are written in a way that no user setup is required. We also make use of a babel plugin that allows glob imports from the modules directory.

This section explains the mechanisms of this setup.

A good place to start is our `metro.config.js` config:

[scaffold/template/metro.config.js](/scaffold/template/metro.config.js)

```javascript
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path")
const extraNodeModules = {
  "@modules": path.resolve(__dirname, "modules")
}
const watchFolders = [path.resolve(__dirname, "modules")]
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
        //redirects dependencies referenced from modules to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), "node_modules", name)
    })
  },
  watchFolders
}
```

We make use of the Metro's Resolver [extraNodeModules](https://facebook.github.io/metro/docs/configuration/#extranodemodules) option to make use of local `npm` libraries installed into the app's `modules` directory (directory where modules get installed).

This gives us three main benefits:

- **Modularity** - We can author modules as npm packages and include their own dependencies that get installed when installing the module.
- **Developer Experience** - Making changes to those files also work with the metro [hot reload](https://facebook.github.io/metro/docs/configuration/#watchfolders).
- **Imports redirects** - Because managing `node_modules` on every `modules` folder isn't the best user experience, we redirect any import to the main app's `node_modules`. This means that a module can import from its own files or from any library, without issues.

## Using @modules

Notice the `@modules` key above, which means that we can import `modules/index.js` like this:

```javascript
import { modules } from "@modules"
```

[scaffold/template/modules/index.js](/scaffold/template/modules/index.js)

```javascript
import mods from "./*/index.js"
import { getModules } from "./modules.js"

export const modules = getModules(mods)
export const initialRoute = modules[0].value.title
export const slices = modules
  .filter(mod => mod.value.slice)
  .map(mod => mod.value.slice)
export const reducers = slices.reduce((acc, slice) => {
  let name = slice.name.charAt(0).toUpperCase() + slice.name.slice(1)
  acc[name] = slice.reducer
  return acc
}, {})
export const navigators = modules
  .filter(mod => mod.value.navigator)
  .map(mod => {
    return {
      name: mod.name,
      value: mod.value.navigator
    }
  })
export const hooks = modules
  .filter(mod => mod.value.hook)
  .map(mod => {
    return {
      name: mod.name,
      value: mod.value.hook
    }
  })
```
