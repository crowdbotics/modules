# Maps

## Setup

Update the map's initial location in:
`modules/maps/index.js`

This is the default value (San Francisco):

```javascript
const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
```

## Android

### Add Google Maps Key

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

## iOS

### Build configuration on iOS

```sh
cd ios
pod install
```

### App Store Submission

> The app's Info.plist file must contain a NSLocationWhenInUseUsageDescription with a user-facing purpose string explaining clearly and completely why your app needs the location, otherwise Apple will reject your app submission.

### Enabling Google Maps on iOS

https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md#enabling-google-maps-on-ios-react-native-all-versions

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Maps from "@modules/maps";

const { title, navigator } = Maps;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
