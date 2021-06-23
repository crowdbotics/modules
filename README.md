# Crowdbotics Modules

This is a monorepo which holds the source code for the various modules we built,
for tracking purposes and to ease the creation of new ones. There's a complete React Native custom template in [scaffold](/scaffold). It also includes utilities for modules installation and removal.

## Requirements

Node.js `v14.17.1` (LTS) is required, we depend on relatively new `fs` calls.

Our template is on the latest React Native and React versions.
[scaffold/template/package.json](/scaffold/template/package.json)

```json
  "dependencies": {
    "react": "17.0.1",
    "react-native": "0.64.0"
  },
```

### Cookiecutter

[Github](https://github.com/cookiecutter/cookiecutter)

Installation

```sh
pip install --user cookiecutter
```

## Getting started

```sh
npm run demo
```

For more information read the [Documentation](/docs).
