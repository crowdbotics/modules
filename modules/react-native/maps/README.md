# Maps

# Setup

Install the required dependencies:

```sh
yarn add react-native-maps
```

Open `/src/navigator/mainNavigator.js` and import the stack navigator defined in `navigator.js`.

```javascript
import Maps from "../features/<module_directory>/navigator.js";
```

And then add it to the navigation:

```javascript
//@BlueprintImportInsertion
Maps: {
  screen: Maps
},
```

Update the map's initial location in:
`src/features/<module_directory>/index.js`

This is the default value (San Francisco):

```javascript
const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
```

# Android

## Add Google Maps Key

Update `android/app/src/main/AndroidManifest.xml` with the following XML meta tags:

```xml
    <application>
        <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="Your Google maps API Key Here"/>

        <!-- You will also only need to add this uses-library tag -->
        <uses-library android:name="org.apache.http.legacy" android:required="false"/>
    </application>
```

# iOS

## Build configuration on iOS

```sh
cd ios
pod install
```

## App Store Submission

> The app's Info.plist file must contain a NSLocationWhenInUseUsageDescription with a user-facing purpose string explaining clearly and completely why your app needs the location, otherwise Apple will reject your app submission.

## Enabling Google Maps on iOS

https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md#enabling-google-maps-on-ios-react-native-all-versions
