# Crowdbotics Modules

This is a monorepo which holds the source code for the various modules we built,
for tracking purposes and to ease the creation of new ones. There's a complete React Native custom template in [scaffold](/scaffold). It also includes utilities for modules installation and removal.

## Requirements

### Node.js

Node.js `v14.17.1` (LTS) is required, we depend on relatively new `fs` calls.

Our template is on the latest React Native and React versions.
[scaffold/template/package.json](/scaffold/template/package.json)

```json
  "dependencies": {
    "react": "17.0.1",
    "react-native": "0.64.2"
  },
```

[Yarn](https://yarnpkg.com/) is required:

```sh
npm install -g yarn
```

### Python dependencies

The `demo` command depends on the Python library [cookiecutter](https://github.com/cookiecutter/cookiecutter).

```sh
pipenv install
```

## Getting started

Generate a new app based on the scaffold:

```sh
yarn run demo
```

Install the `App Menu` module:

```sh
yarn run add react-native-app-menu
```

## Documentation

- [Commands](/docs/commands.md)
- [Modules available](/docs/modules.md)
- [Autoloading modules](/docs/autoloading.md)
- [Authoring new modules](/docs/authoring.md)
- [Resources](/docs/resources.md)
- [@store module](/docs/store.md)
