# Address Selection (Google Autocomplete) React native specs

## Module description

Address Selection Autocomplete module reflects real searches to determine what predictions to show, module looks for common queries that match when someone starts to enter into the search box.

- Search and Select Addresses
- Search address form the map
- Search and select address by moving map

![image](https://github.com/saad-abid-crowdbotics/modules/assets/120275623/8690387c-11ec-4dd7-8f35-84a83cc7a3fb)

## ## Features

 - [x] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [x] This module requires manual iOS setup.

## ## 3rd party setup

Follow these instructions to get your google api key.

[Instructions](https://developers.google.com/maps/documentation/javascript/get-api-key#create-api-keys)

## Dependencies

Dependencies used:

- react-native-google-places-autocomplete - https://www.npmjs.com/package/react-native-google-places-autocomplete
- @react-native-community/geolocation - https://www.npmjs.com/package/@react-native-community/geolocation 
- prop-types - https://www.npmjs.com/package/prop-types
- react-native-maps - https://www.npmjs.com/package/react-native-maps

## ## Module Options

### Global Configs

No global config required.

### Local Configs

In `modules/address-selection-autocomplete/options.js` provide your `GOOGLE_API_KEY` and configure `addressAutocompleteOptions` as per your needs.

```javascript
const GOOGLE_API_KEY = "Your Google Api Key";
const addressAutocompleteOptions = {
  placeholder : "Search",
  initialRegion: { latitude: 37.871666, longitude: -122.272781, latitudeDelta: 0.09219995, longitudeDelta: 0.09224524},
  minLength : 2,
  fetchDetails: true,
  onChangeText: (text) =>{},
  onAddressSelect: (data, details) =>{},
  onFail: () =>{},
  onNotFound: () =>{},
  styles:"",
  hideMap: true,
  country: "",
  predefinedPlaces: [],
  predefinedPlacesAlwaysVisible: true,
  autoFillOnNotFound: true,
  disableScroll: false,
  enablePoweredByContainer: false,
  isRowScrollable: true,
  listUnderlayColor: "#635634",
  listViewDisplayed: "auto",
  timeout: 20000,
  currentLocation: false,
  currentLocationLabel: "",
  renderLeftButton: ()=>{},
  renderRightButton: ()=>{}
  markerUrl: "",
  markerStyles: {}
}
```

### Android setup

Add Google API key to your manifest file `android/app/src/main/AndroidManifest.xml`:

```xml
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>
</application>
```

### iOS setup

1. **Enabling Google Maps**
If you want to enable Google Maps on iOS, obtain the Google API key and edit your `AppDelegate.m` as follows:

```c
#import <GoogleMaps/GoogleMaps.h>  //ad in imports at top.

(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
[GMSServices provideAPIKey:@"_YOUR_API_KEY_"]; // add this line using the api key obtained from Google Console
...

```
The [GMSServices provideAPIKey] should be the first call of the method.

2. Also make sure that your Podfile deployment target is set to >= 13.0 at the top of your Podfile, eg:
```ruby
platform :ios, '13.0'
```

3. Add the following to your Podfile above the use_native_modules! function and run pod install in the ios folder:

```ruby
# React Native Maps dependencies
rn_maps_path = '../node_modules/react-native-maps'
pod 'react-native-google-maps', :path => rn_maps_path
```
