## fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android test

```sh
[bundle exec] fastlane android test
```

Runs all the tests

### android deploy_and_build

```sh
[bundle exec] fastlane android deploy_and_build
```

deploy appetize and build

### android internal

```sh
[bundle exec] fastlane android internal
```

Submit a new Internal Build

### android alpha

```sh
[bundle exec] fastlane android alpha
```

Promote from internal to alpha

### android beta

```sh
[bundle exec] fastlane android beta
```

Promote from internal to beta

### android production

```sh
[bundle exec] fastlane android production
```

Deploy a new version to the Google Play

### android deploy_appetize

```sh
[bundle exec] fastlane android deploy_appetize
```

Deployment to Appetize

### android build_aab

```sh
[bundle exec] fastlane android build_aab
```

create a new android app bundle build

---

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
