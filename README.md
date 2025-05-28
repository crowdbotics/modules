<h1 align="center">
  <a href="https://crowdbotics.com">
    Crowdbotics Modules
  </a>
</h1>

<p align="center">
  A library of Django & React Native modules.
</p>

<p align="center">
  <a href="https://github.com/crowdbotics/modules/actions/workflows/lint.yml">
    <img src="https://github.com/crowdbotics/modules/actions/workflows/lint.yml/badge.svg" alt="Source Code linter" />
  </a>
  <a href="https://github.com/crowdbotics/modules/actions/workflows/release.yml">
    <img src="https://github.com/crowdbotics/modules/actions/workflows/release.yml/badge.svg" alt="Production Release" />
  </a>
</p>

## Contents

- [Modules library](/modules)
- [Changelog](/CHANGELOG.md)
- [Documentation](https://docs.crowdbotics.com)
- [All commands](https://docs.crowdbotics.com/modules-commands)

## Requirements for contributing

To begin contributing, install the [Crowdbotics CLI](https://www.npmjs.com/package/crowdbotics) and it's system requirements to your environment. Please see the [Crowdbotics documentation](https://docs.crowdbotics.com/docs/set-up-your-dev-env) for detailed instructions on how to setup your environment.

## Getting started

Install node modules:

```sh
yarn install
```

Also install the CLI:

```sh
npm install -g crowdbotics
```

Spin a demo app using the customized React Native template:

```sh
npx crowdbotics demo
```

Install modules to your demo app:

```sh
npx crowdbotics add react-native-app-menu
```

Create new modules and test/validate your work locally before submitting a PR:

```sh
npx crowdbotics parse
```

### macOS config

- make sure to have a compatible version of urllib3 with openssl. urllib3 v2.0 or higher is compatible with OpenSSL 1.1.1 or higher

## Modules updates checklist

When adding a new module please make sure that:

- it includes a `meta.json` file in the module's root directory.
- it includes a `preview.png` image in the module's root directory.
- `npx crowdbotics parse` checks pass.
- you can open your module in the demo app (`npx crowdbotics demo`, `npx crowdbotics add <your-module-name-here>`, `cd demo; npx react-native-start`).

When making changes to a module please make sure that:

- `npx crowdbotics parse` checks pass.
- you can open your module in the demo app (`npx crowdbotics demo`, `npx crowdbotics add <your-module-name-here>`, `cd demo; npx react-native-start`).

Include as much documentation for your module as possible, and if you haven't seen it yet we created a style guide for [Authoring Modules](https://docs.crowdbotics.com/authoring-modules).
