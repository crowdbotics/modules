# Maps React native specs

## Module description

Maps module is a react-native based module. Helps user to search and navigate to the required locations.

 - Display the map
 - Set the custom markers
 - Add custom annotations on the map

![image](https://github.com/cbshoaib/modules/assets/76822297/9dfcfec0-d64f-4e7c-8b49-958791a1c6bb)

## ## Features

 - [ ] This module includes environment variables.
 - [ ] This module requires manual configurations.
 - [ ] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [x] This module requires manual iOS setup.

## ## 3rd party setup

You need to get google maps api key from google cloud console account.

Follow these [instructions](https://developers.google.com/maps/documentation/javascript/get-api-key#create-api-keys)


## Dependencies

Dependencies used:
 - react-native-maps  -  https://www.npmjs.com/package/react-native-maps
 - react-native-maps-directions  -  https://www.npmjs.com/package/react-native-maps-directions
 - react-native-google-places-autocomplete  -  https://www.npmjs.com/package/react-native-google-places-autocomplete
 - prop-types -  https://www.npmjs.com/package/prop-types

## ## Module Options

### Global Configs

No global configs required.

### Local Configs

No local configs required.

### Android setup

Update `android/app/src/main/AndroidManifest.xml` with the following XML meta tags:

```xml
    <application>
        <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="Your Google maps API Key Here"/>

    </application>
```


### iOS setup

If you want to enable Google Maps on iOS, obtain the Google API key and edit your `AppDelegate.m(m)` as follows:

```diff
+ #import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate
...

(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
+  [GMSServices provideAPIKey:@"_YOUR_API_KEY_"]; // add this line using the api key obtained from Google Console
...
```

The `[GMSServices provideAPIKey]` should be the **first call** of the method.

Google Maps SDK for iOS requires iOS 13, so make sure that your deployment target is >= 13.0 in your iOS project settings.

Also make sure that your Podfile deployment target is set to >= 13.0 at the top of your Podfile, eg:

```ruby
platform :ios, '13.0'
```

Add the following to your Podfile above the `use_native_modules!` function and run `pod install` in the ios folder:

```ruby
# React Native Maps dependencies
# The following line is only needed if building on an Apple silicon Mac without rosetta.
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/Simon-TechForm/google-maps-ios-utils.git', :branch => 'feat/support-apple-silicon'

rn_maps_path = '../node_modules/react-native-maps'
pod 'react-native-google-maps', :path => rn_maps_path
```

The app's Info.plist file must contain a NSLocationWhenInUseUsageDescription with a user-facing purpose string explaining clearly and completely why your app needs the location, otherwise Apple will reject your app submission. This is required whether or not you are accessing the users location, as Google Maps iOS SDK contains the code required to access the users location.
