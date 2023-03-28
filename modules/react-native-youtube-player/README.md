# Youtube Player Module
The Youtube Player Module is a React Native-based module which will allow user to watch a video.

## Scope Features
The following are the key features of this module:
* Quality options for video
* Pause video option
* Fullscreen option
* Play video on loop option
* Back and Next options
* Video sharing option

## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` and `x-dependencies` section and past them in your project's main `package.json` file.
Here are the required packages for the module:
```
"react-native-youtube": "2.0.2",
"react-native-vector-icons": "9.1.0",
"prop-types": "15.8.1"
```
and run this command.
  ```
  yarn install
  ```

## Keys And Credientials Setup
For keys and credientials setup the following steps are given:
1. Signup or login into Google Console account.
2. From your dashboard, on the top left side, click on `menubar` then go to `api & services` => `library`.
3. After that click on `search menubar` and search for "youtube data api".
![console cloud google](https://user-images.githubusercontent.com/120275623/228167168-7c7d9091-2f0c-4390-9037-278efc0b77be.png)

## Configurations for react-native-youtube
After installation linking is automatically done. You must have your YouTube developer API Key.

## Update your YOUTUBE_API key and VIDEOS_IDS set.
Move into the options file and update your youtube api key. And replace the given VIDEOS_IDS array with your own.
```javascript

const YOUTUBE_API_KEY = "Your youtube api key";
const VIDEOS_IDS = ["uMK0prafzw0"];

```
## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import YouTubePlayer from "@modules/youtube-player";

const { title, navigator } = YouTubePlayer;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const YouTubePlayer = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<YouTubePlayer />
```

## Params

Below is the list of all params that can be passed to the module.

| Name                         | Type       | Description                                                    |
| -----------------------------|:----------:|:---------------------------------------------------------------|
| youtubeApiKey                | `string`   | Your youtube api key.                                          |
| playerSetting                | `object`   | Player configrutations {isReady: false, status: null, quality: null, error: null, isPlaying: true, isLooping: true, currentTime: 0, videosIndex: 0, fullscreen: false, playerWidth: Dimensions.get("window").width }             |
| videoIds                     | `array`    | List of videos.                                                |
| forwordTimeDurationInSeconds | `number`   | Seconds to forword video time                                  |
| backwordTimeDurationInSeconds| `number`   | Seconds to backword video time                                 |
| isForwordTimeDuration        | `bool`     | Show forword time button                                       |
| isBackwordTimeDuration       | `bool`     | Show backword time button                                      |

## Module Preview Video

https://user-images.githubusercontent.com/76822297/176699752-8f994563-6dab-4da7-8d7c-b781dbee8f35.mp4

## Module Specifications
Here is the m[Module Specification DOcument](https://docs.google.com/document/d/1tPCNZNFV-5z-6lKB48Wj664OILffJO3PQhPITxyzjgk/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
