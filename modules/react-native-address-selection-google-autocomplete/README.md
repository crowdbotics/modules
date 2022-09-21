# Address Selection (Google Autocomplete) module
 Address Selection Autocomplete module reflect real searches. To determine what predictions to show, module looks for common queries that match when someone starts to enter into the search box. 


## Installation

### Android
Add your API key to your manifest file `android/app/src/main/AndroidManifest.xml`:

```xml
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>
</application>
```

### iOS
After installing the npm package, we need to install the pod.

1. (cd ios && pod install)
//# --- or ---
2. npx pod-install

3. **Enabling Google Maps**
If you want to enable Google Maps on iOS, obtain the Google API key and edit your `AppDelegate.m` as follows:

```diff
#import <GoogleMaps/GoogleMaps.h>  //ad in imports at top.

(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
[GMSServices provideAPIKey:@"_YOUR_API_KEY_"]; // add this line using the api key obtained from Google Console
...

```
The [GMSServices provideAPIKey] should be the first call of the method.

4. Also make sure that your Podfile deployment target is set to >= 13.0 at the top of your Podfile, eg:
```ruby
platform :ios, '13.0'

```

5. Add the following to your Podfile above the use_native_modules! function and run pod install in the ios folder:

```ruby
# React Native Maps dependencies
rn_maps_path = '../node_modules/react-native-maps'
pod 'react-native-google-maps', :path => rn_maps_path
```

## Local Configs
In `modules/address-selection-autocomplete/options.js` provide your `GOOGLE_API_KEY` and configure and use `addressAutocompleteOptions` as your needs.

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

### `addressAutocompleteOptions` properties:

Here is the list of the properties that `addressAutocompleteOptions` object holds.

| Name              | Type       | Description                                                    |
| ---------------|:----------:|:---------------------------------------------------------------|
| placeholder    | `string`   | placeholder text for the TextInput field.             |
| initialRegion  | `object`   | Initial region to be displayed on the map.             |
| minLength      | `number`   | minimum length of text to trigger a search.                 |
| fetchDetails   | `boolean`  | get more place details about the selected option from the Place Details API. |
| onChangeText   | `function` |Callback function returns input text as it's param.|
| onAddressSelect        | `function` | Called when after a suggestion is selected, returns `data` and `details` as it's params.|
| onFail         | `function` | Called if an unspecified error comes back from the API.|
| onNotFound     | `function` | Called if the Google Places Details API returns a 'not found' code (when you press a suggestion).|
| styles         | `object`   | Style object to style the search places field.           |
| hideMap        | `boolean`  | Set it `false` to select the address from the the map. |
| country        | `string`   | Restrict search for a specific country by providing two character [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code of the country. |
| markerUrl      | `string`   | Marker image url to be displayed on the map. |
| markerStyles   | `object`   | Style object for the marker. |
| predefinedPlaces| `array`   | Array of object, each object contains a locations. This location object will be something like this `{description: "", geometry{location: {lat:48.8152937, lng:2.4597668} } }`. |
| predefinedPlacesAlwaysVisible | `boolean` | Shows predefined places at the top of the search results. By default it's false.|
| autoFillOnNotFound | `boolean` | Displays the result from autocomplete if the place details api return not found.|
| currentLocation| `boolean`  | Will add a 'Current location' button at the top of the predefined places list. |
| currentLocationLabel | `string` | Change the display label for the current location button.|
| disableScroll  | `boolean`  | Disable scroll on the results list.|
| enablePoweredByContainer | `boolean` | Show "powered by Google" at the bottom of the search results list. |
| isRowScrollable| `boolean`  | Enable/disable horizontal scrolling of a list result.|
| listUnderlayColor| `string` | Underlay color of the list result when pressed. |
| listViewDisplayed| `string` | Override the default behavior of showing the list (results) view. Can select one from `'auto' | true | false` options.|
| renderLeftButton|`function`| Add a component to the left side of the Text Input|
| renderRightButton | `function` | Add a component to the right side of the Text Input. |
| timeout        |`number`| How many milliseconds until the request will timeout. Default value is `20000` ms.|

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import AddressAutoComplete from "@modules/address-selection-autocomplete";

const { title, navigator } = AddressAutoComplete;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';

const AddressAutoComplete = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<AddressAutoComplete />

```




## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
