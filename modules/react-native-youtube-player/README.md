# Youtube Player Module
The Youtube Player Module is a React Native-based module which will allow user to watch a video.


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

## Features
The following are the key features of this module:
* Quality options for video
* Pause video option
* Fullscreen option
* Play video on loop option
* Back and Next options
* Video sharing option


https://user-images.githubusercontent.com/76822297/176699752-8f994563-6dab-4da7-8d7c-b781dbee8f35.mp4

