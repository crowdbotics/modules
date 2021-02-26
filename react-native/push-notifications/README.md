# Push Notifications

## Introduction

This modules uses the [OneSignal](https://onesignal.com) service to provide push notifications capabilities to your Android or iOS app.

It includes the OneSignal SDK for React Native: [`react-native-onesignal`](https://www.npmjs.com/package/react-native-onesignal).

## Setup

[Requirements](https://documentation.onesignal.com/docs/react-native-sdk-setup#step-1---requirements) overview:

- OneSignal account
- iOS Push Certificate - for iOS
- Firebase project - for Android

Setup steps:

1. Create a [OneSignal account](https://onesignal.com) and create a new [One Signal application](https://app.onesignal.com/apps/new).

2. Follow and complete the [Step 4 of the OneSignal documentation](https://documentation.onesignal.com/docs/react-native-sdk-setup#step-4---install-for-ios-using-cocoapods-for-ios-apps). Don't forget to commit and push the changes.

3. Generate an [iOS Push Certificate](https://documentation.onesignal.com/docs/generate-an-ios-push-certificate).

4. Generate a [Firebase Server Key](https://documentation.onesignal.com/docs/generate-a-google-server-api-key).

5. Issue a new test push notification, with immediate delivery, from the [OneSignal Dashboard](https://app.onesignal.com/apps/). Verify it works on your running Android simulator or on a real iOS Device (iOS push notifications can't be tested in a simulator). You will have to provide the `ONE_SIGNAL_APP_ID` env var in your `.env` file with the App ID key obtained from [Keys & IDs](https://documentation.onesignal.com/docs/accounts-and-keys#section-app-id) if you're testing locally in the Android simulator.

6. Add the `ONE_SIGNAL_APP_ID` env var value in your App's [Crowdbotics Dashboard](https://app.crowdbotics.com/dashboard/).

7. Deploy your app.
