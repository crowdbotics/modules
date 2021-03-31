# Authoring Modules

## Table of contents

- [Guidelines](#guidelines)
- [package.json](#packagejson)
- [Adding dependencies to your module](#adding-dependencies-to-your-module)
- [Adding dependencies with Native code](#adding-dependencies-with-native-code)
- [Running code on app load](#running-code-on-app-load)

## Guidelines

Modern React Native components guidelines:

- Prefer function components over class components
- Prefer React Hooks over React.component APIs
- Prefer react-redux Hooks over connect HOC
- Prefer redux-toolkit over custom redux logic setups
- Prefer redux-thunk over redux-saga
- Prefer pure components

## package.json

Your module's `main` key should always point to `index.js`. We also suggest that you name your module with a namespace prefix `@modules` like in the example below.

Your module can include its own dependencies, more on that in the following sections.

[react-native/maps/package.json](/modules/react-native/maps/package.json)

```json
{
  "name": "@modules/maps",
  "version": "1.0.0",
  "description": "## Setup",
  "private": true,
  "main": "index.js",
  "dependencies": {},
  "x-dependencies": {
    "react-native-maps": "0.27.1"
  },
  "author": "Crowdbotics"
}
```

There's a strict requirement on the format of your default export on your module's `index.js` file.

It should look like this:

```javascript
export default {
  title: "Maps", // required
  navigator: Maps, // optional
  slice: MapsSlice, // optional
};
```

Or like this:

```javascript
export default {
  title: "Maps", // required
  navigator: Maps, // optional
  slice: {
    reducer: MapsReducer, // optional
    actions: [...MapsActions], // optional
  },
};
```

The key `title` is required, everything else is optional and can be ommited.
We use this format to "auto-import" every module into the app automatically.

We also support plain exports:

```javascript
export default MapsNavigator;
```

Which would be converted into this object:

```javascript
export default {
  title: "MapsNavigator",
  navigator: MapsNavigator,
};
```

## Adding dependencies to your module

If you want to include libraries that your module depends upon and imports from, just include those as regular dependencies in the `package.json`.

```sh
npm install <dependency> -- save
```

Whenever the module gets the installed the dependencies of your module get installed in the app via npm's sub-dependencies.

If your library includes native code or depends on the [React Native's autolinking](https://github.com/react-native-community/cli/blob/641b21f583c97e3d48ce87d5fe804f42db92fa5c/docs/autolinking.md) feature please read the section below too.

## Adding dependencies with Native code

[React Native's autolinking](https://github.com/react-native-community/cli/blob/641b21f583c97e3d48ce87d5fe804f42db92fa5c/docs/autolinking.md) doesn't work yet with NPM's sub-dependencies.

Example, including `react-native-maps` in the maps module will not link the native
modules properly and results in

```
[Sat Jan 16 2021 16:23:45.446]  ERROR    Invariant Violation: requireNativeComponent: "AIRMap" was not found in the UIManager.
```

https://github.com/react-native-community/cli/issues/1347
https://github.com/react-native-maps/react-native-maps/issues/3427#issuecomment-627135604

In order to include `react-native-maps` in your module, simply move the dependency from "dependencies" to "x-dependencies" in your module's `package.json`. Those will be installed alongside the app's "dependencies" avoiding the limitation above.

## Running code on app load

Multiple scenarios and libraries require you to wrap your screen or other components (even your root component) to create context providers or to run initialization code.

Our auto-loading setup allows you to author a custom React hook on your module that gets automatically called in the app's root component.

In other words, any code that you would write inside your root component `componentDidMount` function can be instead written as a custom Hook.

To write the custom hook, please check the React documentation:
https://reactjs.org/docs/hooks-custom.html

And then export the hook in the module default export like below:

```javascript
const useOneSignal = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // ...
  });

  return someState;
};
export default {
  title: "Push Notifications",
  hook: useOneSignal,
};
```

The example above is for an headless module (no screens), but you can export hooks in regular modules too.
