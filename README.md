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
