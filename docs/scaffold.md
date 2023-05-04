# React Native scaffold

## Summary

- [template](/scaffold/template) is a copy of the `react-native`'s template directory. Please don't change it manually, refer to the included `yarn run template` command and the documentation.
- [template.config.js](/scaffold/template.config.js) is a modified version of the `react-native`'s template config, only `postInitScript` got added.
- [install.js](/scaffold/install.js) is a custom post template initialization / pre-dependencies-installation script. This script alone is responsible of adding all of the customizations that Crowdbotics maintains on top of the standard `react-native` default base template. Refer to it as the source of truth for what kind of customizations we do.

## Versions

### React & React Native

React Native version is [v0.71.7](https://github.com/facebook/react-native/releases/tag/v0.71.7), and React version is [v18.2.0](https://github.com/facebook/react/releases/tag/v18.2.0)

### Android SDK

The target is Android version 33, and minimum support level set at version 21.

[/scaffold/template/android/build.gradle](template/android/build.gradle):

```gradle
    ext {
        buildToolsVersion = "33.0.0"
        minSdkVersion = 21
        compileSdkVersion = 33
        targetSdkVersion = 33

        // We use NDK 23 which has both M1 support and is the side-by-side NDK version from AGP.
        ndkVersion = "23.1.7779620"
    }
```

### iOS SDK

Minimum support level set at 12.4 from [upstream](https://github.com/facebook/react-native/blob/6115ce53a2df4449769e4b9b6ca95fc29955fff0/scripts/react_native_pods.rb#L26-L31) by default:

[/scaffold/template/ios/Podfile](/scaffold/template/ios/Podfile):

```ruby
platform :ios, min_ios_version_supported
```

## Upgrading the scaffold to a newer React Native version

Before we start please make sure that you meet the requirements:

- node
- yarn
- git
- python
- pipenv

Create a new branch and run the command:

```
cd your-repo-dir
git checkout -b upgrade-scaffold
npx crowdbotics/modules#upgrade/react-71
```

And choose the "Upgrade my scaffold" option:

```
$ npx crowdbotics/modules#upgrade/react-71
? What do you want to do? (Use arrow keys)
❯ Upgrade my scaffold
  Check cookiecutter context
  Clean cached directories
  git reset to HEAD
  Quit
```

Pay special attention to this section:

> Check files integrity and upgrade to new versions

> ✅ App.js - Integrity check passed. File has been replaced.

> ⚠ babel.config.js - Failed integrity check. Refer to the new version: babel.config.new.js

Manually review any files that we couldn't upgraded automatically (`.new` files). Merge the contents of those with your existing files, and commit everything.

Create a Pull Request. Done!
