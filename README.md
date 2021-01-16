# Crowdbotics Modules

This is a monorepo which holds the source code for the various modules we built,
for tracking purposes and to ease the creation of new ones.

# Generate data

Run the command to generate the JSON data, ready to be pasted in the Admin:

```sh
npm run parse
```

In our `crowdbotics-slack-app` backend we support two flags on each file:

- `parentDir` - default to `src/features/<module_name>` if null, or use it otherwise
- `newFile` - undocumented/unimplemented?

# Modules Available

## React Native

- [User Profile](react-native/user-profile)
- [Articles](react-native/articles)
- [Maps](react-native/maps)

# Gotchas

## x-dependencies

React Native autolinking doesn't work with sub-dependencies.

Example, including `react-native-maps` in the maps module will not link the native
modules properly and results in

```
[Sat Jan 16 2021 16:23:45.446]  ERROR    Invariant Violation: requireNativeComponent: "AIRMap" was not found in the UIManager.
```

https://github.com/react-native-community/cli/issues/1347
https://github.com/react-native-maps/react-native-maps/issues/3427#issuecomment-627135604
