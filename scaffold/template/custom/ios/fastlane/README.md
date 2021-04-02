# fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using

```
[sudo] gem install fastlane -NV
```

or alternatively using `brew install fastlane`

# Available Actions

## iOS

### ios tests

```
fastlane ios tests
```

Runs all the tests

### ios init_app

```
fastlane ios init_app
```

Create app in app store connect

### ios build_setup

```
fastlane ios build_setup
```

Pre-build setup

### ios create_build

```
fastlane ios create_build
```

Create a new beta build to TestFlight

### ios beta

```
fastlane ios beta
```

Push a new beta build to TestFlight

### ios deploy_appetize

```
fastlane ios deploy_appetize
```

Deployment to Appetize

---

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
