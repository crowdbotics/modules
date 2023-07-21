# Scaffold Updates Checklist

When making scaffold updates, please make sure the following still works:

- creating a demo app (`yarn run demo`)
- iOS Appetize build
- iOS TestFlight build
- iOS local emulator (`npx react-native start`)
- iOS local xcode build
- Android Appetize build
- Android Internal build
- Android local emulator (`npx react-native start`)
- Android local debug build (`./android/gradlew assembleDebug -p ./android`)
- Web deployment (called API in the Dashboard)
- Web local dev server (`yarn run web`)
- Web local build (`yarn run web:build`)
- Studio loads the app and the welcome screen renders correctly

In order to test scaffold updates on Dashboard/Studio create a new Review App and set `REACT_NATIVE_SCAFFOLD_REPO_BRANCH` to the name of your branch.

Double check your work locally with those helper scripts checks:

- `yarn run bootstrap` produces no changes besides potential changes in `yarn.lock` resolved versions
- `yarn run template` produces no changes
- `yarn run semver` check passes

**Important!**

Increase the version of the scaffold in [package.json](https://github.com/crowdbotics/modules/blob/master/scaffold/package.json) and [.crowdbotics.json](https://github.com/crowdbotics/modules/blob/master/scaffold/template/custom/.crowdbotics.json).

Make this new version available in the upgrade tool (npx crowdbotics/modules) by updating [config.js](https://github.com/crowdbotics/modules/blob/master/config.js) to include a new `config.upgrade.versions` and then finally run:

```
pipenv shell
yarn run manifest
```

Finally make sure to update the scaffold [CHANGELOG](https://github.com/crowdbotics/modules/blob/master/scaffold/CHANGELOG.md) with human friendly descriptions.

