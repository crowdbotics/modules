# Changelog

Based on [Common Changelog](https://common-changelog.org/).

## 1.2.0 - 2023-07-04

### Added

Added a check that builds the Android app and iOS app for every PR. This pipeline runs
in CircleCI, it has three basic steps. First the modules repo is cloned and its dependencies are installed, in the same job a scaffold will be generated with the current modules code.
Then both Android and iOS jobs will run simultaneously, each running a dev build of the scaffold. If the builds
finish succesfully we can assume there are no major dependency issues.

- Added config.yml file that defines pipeline for CircleCI
- Bumped Python version from '3.8.13' to '3.8.17'.

## 1.1.2 - 2023-06-23

### Fixed

- Read cookiecutter context from .crowdbotics.json when the user's version is not 1.1.0.

## 1.1.1 - 2023-06-19

### Fixed

- Prevent changing existing manifests with `yarn run manifest`.

## 1.1.0 - 2023-05-31

### Added

Introduced upgrade utility for scaffold users - available via `npx crowdbotics/modules`.

Starts an upgrade process that gives the user the option to upgrade their app to any of the scaffold released versions. Validates that the user is currently in a supported version for the option picked.

The script iterates over all scaffold files included in the target release and brings that file onto the user app repository. It is smart enough to not override any file that the user customized since scaffolding their app. For those files where it wasn't possible to override the user's given a diff file and the new version file. With the diff file (and the instructions included in it) the user can then see what customization he did against the original version so that he can then decide which to keep in the new version of the file. See [scaffold-upgrade.md]](/docs/scaffold-upgrade.md).

New helper scripts for maintainers:

- `yarn run semver` - checks whether the scaffold [.crowdbotics.json](/scaffold/template/custom/.crowdbotics.json) version increased and that the scaffold [package.json](/scaffold/package.json) version matches it. This script runs automatically on the [semver](/.github/workflows/semver.yml) Github Action whenever a Pull Request makes changes to [scaffold](/scaffold).
- `yarn run manifest` - produces a manifest file based on the latest version added to the [config](/config.js). Useful for when making changes to the scaffold where you would need to generate a new manifest.

### Changed

- Bumped [package.json](/package.json) "engines.node" version to `>16`.
- Bumped [.nvmrc](/.nvmrc) Node.js version to [18.16.0](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V18.md#18.16.0) (LTS).
- Bumped [.python-version](/.python-version) Python's version to [3.8.13](https://www.python.org/downloads/release/python-3813/).
- Bumped [.ruby-version](/.ruby-version) Ruby's version to [3.2.2](https://github.com/ruby/ruby/releases/tag/v3_2_2)

### Fixed

- Removed `/dist/raw` directory and added it to [.gitignore](.gitignore). This directory didn't have to be tracked since it's an intermediary build directory that is not ready for consumption.
- Replaced all Node's `rmdirSync` deprecated calls with `rm` call with `{ recursive: true }` option.

## 1.0.0 - 2021-01-11

_First release._
