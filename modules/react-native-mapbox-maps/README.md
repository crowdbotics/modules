# MapBox Maps
MapBox Maps module is a react-native based module. Helps user to search and navigate to the required locations.


## MapBox Credentials
1. Login to [MapBox Developer Account](https://account.mapbox.com/auth/signin/).
2. To create a private token click on `+ Create a token` button.
3. Select the required scopes and click `create token` button.
4. Copy the new created token and save it for later use.


## Design a custom map style
1. On your [Account Page](https://account.mapbox.com/), Click `Create map in studio ->` button.
2. On next page, click `New style` button.
3. Choose a template and click `customize template` button.
4. Customize your map and click `publish` button to save the map styles.
5. Your map will be displayed on the Style page.
6. click `:` button and copy the `styleURL` which will look something like this `mapbox://styles/{your_account}/xxxxxxxxxxxx`. 


## Android Installation

2. Overwrite mapbox dependencies within your `android/build.gradle > buildscript > ext` section

```
buildscript {
    ext {
        // ...
        RNMapboxMapsImpl = "mapbox"

    }
}
```

2. Then under section allprojects/repositories add your data:
```
// android/build.gradle

allprojects {
    repositories {
        // ...other repos
        maven {
            url 'https://api.mapbox.com/downloads/v2/releases/maven'
            authentication {
                basic(BasicAuthentication)
            }
            credentials {
                // Do not change the username below.
                // This should always be `mapbox` (not your username).
                username = 'mapbox'
                // Use the secret token you stored in gradle.properties as the password
                password = project.properties['MAPBOX_DOWNLOADS_TOKEN'] ?: ""
            }
        }
        // ...even more repos?
    }
}
```

## iOS Installation

1. Add the following to your ios/Podfile:
```
  pre_install do |installer|
    $RNMapboxMaps.pre_install(installer)
    ... other pre install hooks
  end
  post_install do |installer|
    $RNMapboxMaps.post_install(installer)
    ... other post install hooks
  end
```

2. Running pod install download the proper mapbox dependency

```
cd ios

pod install
```



## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import MapBoxMaps from "@modules/mapbox-maps";

const { title, navigator } = MapBoxMaps;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript

import { modules } from '@modules';

const Maps = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<MapBoxMaps .../>

```

## Update Local Options

Update the following options in `mapbox-map/options.js`.


```
const MAPBOX_TOKEN = MapBox Secret Token generated above in MapBox Credentials section.
const mapStyleURL = Map `styleURL`
const ORIGIN = Initial location for the map
const DESTINATION = location
const POLYGON = Update the polygon object to draw shape on the map 
const ROUTE = Update route object to draw line between two points 
const MAP_SETTINGS = settings for map
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)