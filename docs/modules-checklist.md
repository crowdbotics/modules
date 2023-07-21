# Modules Checklist

When adding a new module please make sure that:

- it includes a `meta.json` file in the module's root directory.
- it includes a `preview.png` image in the module's root directory.
- `yarn run parse` checks pass.
- you ran `yarn run dist` and added the changes.
- you can open your module in the demo app (`yarn run demo`, `yarn run add <your-module-name-here>`, `cd demo; npx react-native-start`).

When making changes to a module please make sure that:

- `yarn run parse` checks pass.
- you ran `yarn run dist` and added the changes.
- you can open your module in the demo app (`yarn run demo`, `yarn run add <your-module-name-here>`, `cd demo; npx react-native-start`).

Include as much documentation for your module as possible, and if you haven't seen it yet we created a style guide for [Authoring Modules](/modules/authoring-modules.html).
