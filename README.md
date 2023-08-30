<h1 align="center">
  <a href="https://crowdbotics.com">
    Crowdbotics Modules
  </a>
</h1>

<p align="center">
  A customized React Native scaffold and a library of Django & React Native modules.
</p>

<p align="center">
  <a href="https://github.com/crowdbotics/modules/actions/workflows/lint.yml">
    <img src="https://github.com/crowdbotics/modules/actions/workflows/lint.yml/badge.svg" alt="Source Code linter" />
  </a>
  <a href="https://github.com/crowdbotics/modules/actions/workflows/parse.yml">
    <img src="https://github.com/crowdbotics/modules/actions/workflows/parse.yml/badge.svg" alt="Modules validation" />
  </a>
  <a href="https://github.com/crowdbotics/modules/actions/workflows/release.yml">
    <img src="https://github.com/crowdbotics/modules/actions/workflows/release.yml/badge.svg" alt="Production Release" />
  </a>
</p>

## Contents

- [Modules library](/modules)
- [Custom React Native template](/scaffold/template/custom)
- [Documentation](https://crowdbotics.github.io/modules/)
- [Changelog](/CHANGELOG.md)
- [Scaffold Changelog](/scaffold/CHANGELOG.md)

## Requirements for contributing

The following must be available in your system:

- [node](https://nodejs.org/en)
- [yarn](https://yarnpkg.com/)
- [python](https://www.python.org/)
- [pipenv](https://pypi.org/project/pipenv/)
- [urllib3](https://urllib3.readthedocs.io/en/stable/) without this the project will not run in ```macOS``` environments

Node `v18.16.0` (LTS) recommended.

## Getting started

Install node modules:

```sh
yarn install
```

Install python packages:

```sh
pipenv install
```

Spin a demo app using the customized React Native template:

```sh
yarn run demo
```

Install modules to your demo app:

```sh
yarn run add react-native-app-menu
```

Create new modules and test/validate your work locally before submitting a PR:

```sh
yarn run parse
```


### macOS config
- make sure to have a compatible version of urllib3 with openssl. urllib3 v2.0 or higher is compatible with OpenSSL 1.1.1 or higher