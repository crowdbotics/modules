# Maps
Maps module is a react-native based module. Helps user to search and navigate to the required locations.

## Android
### Add Google Maps Key

Update `android/app/src/main/AndroidManifest.xml` with the following XML meta tags:

```xml
    <application>
        <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="Your Google maps API Key Here"/>

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

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Maps from "@modules/maps";

const { title, navigator } = Maps;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript

import { modules } from '@modules';

const Maps = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<Maps origin={obj} originTitle = {''} apiKey={GOOGLE_MAPS_APIKEY} onNavigationStart={func} .../>

```

## Params

Below is the list of all params that can be passed to the module.

| Name              | Type       | Description                                                    |
| ---------------   |:----------:|:---------------------------------------------------------------|
| origin `required` | `object`   | The origin location `{latitude: , longitude: }`to start routing from.|
| originTitle       | `string`   | Title of the origin             |
| originDescription | `string`   | Description of the provided origin.                 |
| apiKey `required` | `string`   | Your Google Maps API Key. Make sure you've enabled the Google Maps Directions API for that key using the Google API Console. |
| enableDirections  | `boolean`  |Set `enableDirections=true` if you want to choose destination and start navigation between origin and destination.|
| onNavigationStart | `function` | Called in case the navigation has started between origin to destination|
| onNavigationError | `function` | Called in case the navigation has failed.           |
| onLatLngChange | `function` | Called in case the marker has moved to new location.           |
| getDistance (km)  | `function` | Returns the distance(as function param) between origin and destination.  |
| getDuration (minutes)| `function` | Returns estimated time(as function param), needed to get from origin to destination|
| markerColor       | `string`   | Custom color for the marker.                     |
| markerImage       | `string`   | URL of the image to be displayed as marker.                     |
| markerImageStyle  | `object`   | Set style for the marker image. e.g (`height`, `width`, `resizeMode`) etc. |
| getDestinationAddress| `function` | Returns  `{latitude: 37.78825, longitude: -122.4324}` of the destination.       |
| strokeColor       | `string`   | Color for the line connecting origin and destination.          |
| strokeWidth       | `number`   | Width of the line connecting origin and destination.                        |
| showSearchInput   | `boolean`  | Set `showSearchInput={true}` to show search bar on map to search location. It's default value is `false`. |
| mainContainerStyle| `object`   | Set style for the maps main container.  |
| markedLocations   | `array` | Array of objects. Each object should have latitude, longitude, title and description for the location to be marked on the map. e.g `{latitude: 37.78825, longitude: -122.4324, title: '', description: ''}`|
| onDragStart         | `function` | Callback that is called when the user initiates a drag on this marker.|
| onDrag         | `function` | Callback called continuously as the marker is dragged.|
| onDragEnd         | `function` | Callback that is called when a drag on this marker finishes. Returns locations longitude and latitude as function param.|


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
