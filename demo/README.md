# Crowdbotics React Native scaffold

After cloning this repo, you will need to install the dependencies:

`cd ProjectName`

`yarn install`

Then, you need to install the Podfile:

`cd ios`

`pod install`

## Installing all dependencies in for development

Please follow this guide and install the correct dependencies for your current OS and the OS that you want to build (iOS or Android)

https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies

## Setup

### Google config

There is two files that you need to edit to make work the push notifications, google sign up and other Google Services:

1. `ios/GoogleService-Info.plist`
2. `android/app/google-services.json`

You need to create a project in firebase console and update all the credentials on both files (current files have invalid credentials)

Also, you will need to modify your URL types in `Info`, follow [this](https://github.com/react-native-community/react-native-google-signin/blob/master/docs/ios-guide.md#3-xcode-configuration) instructions:

Finally, you will need to add `GoogleService-Info.plist` (file reference) to your iOS project via xcode.

1. Open `modules_dev_18197.xcodeproj`in xcode.
2. Go to main target > Build Phases > Copy Bundle resources
3. Tap un add button
4. Search the `GoogleService-Info.plist`inside `ios` folder.
5. Make sure you can see `GoogleService-Info.plist` inside in xcode. Like this:

![Expected project config](https://github.com/react-native-community/react-native-google-signin/raw/master/img/buildPhasesWithoutPods.png)

## Running with React Native CLI

### Running android simulator

1. Activate android emulator following this [instructions](https://facebook.github.io/react-native/docs/running-on-device)
2. `react-native run-android` from project home folder

### Running iOS simulator

1. Go to `ios` folder and run `pod install` (if you don't have pod installed, follow this [instructions](https://guides.cocoapods.org/using/getting-started.html) )
2. Run `react-native run-ios` from project home folder.

If you find any compiling problems, try to clean your cache. From the home app folder run:

`cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../`

and

`cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../`

## Running with Fastlane

[Fastlane](https://fastlane.tools/) makes testing, building, and deploying apps
easier.

Install fastlane globally (`npm i -g fastlane` or `yarn i -g fastlane`).
Android and iOS dependencies are the same as React Native CLI.

All fastlane commands are run from the platform directory. For example, Android
commands must be run from `android/`. Fastlane should be executed using `bundle exec` to ensure dependencies are managed correctly.

The commands for Android and iOS are the same:

- Run tests: `bundle exec fastlane tests`
- Local build: `bundle exec fastlane build`
- Build and upload a beta (requires signing): `bundle exec fastlane beta`
- Build or promote a release: `bundle exec fastlane deploy`

### Android

Publish an Android app you must first create an app in the Play Console and
manually upload an APK. After the first upload run `bundle exec fastlane supply init` from `android/` to sync with the Play store. All future releases will be
uploaded automatically.

Android uses tracks. A beta release will build the app and upload to the beta
track. Deploying will promote from beta to production.

### iOS

CB developers must follow fastlane's [codesigning guide](https://codesigning.guide/) for using match.
Match will automatically sign iOS builds.

New CB developers should get access to the codesigning repo and run `bundle exec fastlane match development` from `ios/`.

Not a CB developer? Create an [Apple developer](https://developer.apple.com)
and follow the instructions on [codesigning guide](https://codesigning.guide/)
to setup your certificates.
