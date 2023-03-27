# MapBox Maps
MapBox Maps module is a react-native based module. Helps user to search and navigate to the required locations.
Using this module users will implement a dynamic, highly customized, and optimized map for various use cases or design their own custom style map.

## Features
1. Ability to display the map
2. Ability to set the custom markers
3. Ability to add custom annotations on the map
4. Ability to draw polylines and polygons between coordinates
5. Ability to add custom layers on map
6. Ability to change the label fonts, color, and sizes on the map
7. Ability to change the streets, buildings, and water theme colors
8. Ability to mark the point of interest on the map.
9. Ability to get the distance and duration between the origin and destination
10. Ability to get the routes according to the walking, cycling, and driving mode.
11. Ability to get the other possible route to the destination


## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` section and past them in your project's main `package.json` file, and run this command.
  ```
  yarn install
  ```



## MapBox Credentials
1. Login to [MapBox Developer Account](https://account.mapbox.com/auth/signin/).
2. To create a private token click on `+ Create a token` button.
3. Select the required scopes and click `create token` button.
4. Copy the new created token and save it for later use.

![token_mapbox](https://user-images.githubusercontent.com/76822297/227925384-a845ff6d-c128-4ab2-92bb-7a0d50245e9b.png)


## Design a custom map style
1. On your [Account Page](https://account.mapbox.com/), Click `Create map in studio ->` button.
2. On next page, click `New style` button.
3. Choose a template and click `customize template` button.
4. Customize your map and click `publish` button to save the map styles.
5. Your map will be displayed on the Style page.
6. click `:` button and copy the `styleURL` which will look something like this `mapbox://styles/{your_account}/xxxxxxxxxxxx`. 

![mapbox_url](https://user-images.githubusercontent.com/76822297/227925487-04c61ccb-f08f-4396-aca3-4ad989fbf1d6.png)

## Configure your secret token
To avoid exposing your secret token, add it as an environment variable:

1. Find or create a gradle.properties file in your Gradle user home folder.
2. The folder can be found at `USER_HOME >> .gradle`. 
3. Once you have found or created the file, its path should be `USER_HOME >> .gradle >> gradle.properties`. 
4. Add your secret token your `gradle.properties` file:
    ```
    MAPBOX_DOWNLOADS_TOKEN=YOUR_SECRET_MAPBOX_ACCESS_TOKEN
    ```


## Android Installation

1. In `android/app/src/main/res/values/strings.xml` file and add the following string resource,

```xml
<string name="mapbox_access_token">YOUR_MAPBOX_ACCESS_TOKEN</string>
```

2. Overwrite mapbox dependencies within your `android/build.gradle > buildscript > ext` section

```
buildscript {
    ext {
        // ...
        RNMapboxMapsImpl = "mapbox"

    }
}
```

3. Then under section allprojects/repositories add your data:
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
const GOOGLE_API_KEY = "Your google api key";
const POLYGON = Update the polygon object to draw shape on the map 
const MARKED_CENTERED = An array containing longitude and latitude;
const MAP_SETTINGS = settings for map
```

### Module Specifications
Here is the m[Module Specification DOcument](https://docs.google.com/document/d/1zz1woIU_bHO4uECTRElSuuae_xBwmLKBTBQy_YzNtK8/edit?usp=sharing), which provides more information about the module's actual intentions.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
