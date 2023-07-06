# Audio Player Module
This is a react-native module for audio player. This module provides simple player functionalities for both android and ios platforms.

## Features
1. Play audios with smoothness
2. Download playing audio
3. Select audio to play from playlist
4. Playing of the previous/next song


## Required Dependencies
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. 
Keep the below packages in project's package.json file.
```
  "react-native-audio-recorder-player": "2.6.2",
  "react-native-slider": "^0.11.0",
  "rn-fetch-blob": "0.12.0"
```
RUn the command to install dependencies:
  ```
  yarn install
  ```

## Installation
### Android
1. In the `android/settings.gradle` add the following line.

```java
include ':react-native-audio-recorder-player'
```

2. In the `android/build.gradle` add the following line in dependencies.:

```java

 dependencies {
    
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.10" //
    }

```

### For new scaffold 0.71.7

1. In the `android/build.gradle` add the following line in dependencies.:

```java
dependencies {
    
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.6.10" //
    }
```
2. Add `xmlns:tools="http://schemas.android.com/tools"` to the manifest tag

```
<manifest
    xmlns:tools="http://schemas.android.com/tools">
...
```

3. Add `tools:replace="android:label"` to the application tag

```
  <application
        tools:replace="android:label">
```


### IOS
1. Using React Native >= 0.61

```
npx pod-install
```


## Manual Setup
1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import AudioPlayer from "@modules/audio-player";

const { title, navigator } = AudioPlayer;
```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';
const AudioPlayer = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<AudioPlayer />;
```
## Local Configs
in modules/audio-player/options.js you can update following options:

```javascript

export const tracks = [
  {
      id: '', //Unique id for each track
      path: '', //URL of the audio
      title: '', //Title of the audio
      artwork: '', //Url of the image
      album: '', //Title for album
  },
```

## Params

Below is the list of all Params with their data types that are considered primitive or the basic ones needed for our module to work.

| Params              | Data Types         | Description                                                       |
| --------------------|:------------------:|:---------------------------------------------------------------|
| onPlay              | `function` | Called when an audio start playing.                     |
| onPause             | `function` | Called when the audio is stopped.   |
| onBackwardCall      | `function` | Called when backward button of the player is clicked.    |
| onForwardCall       | `function` | Called when forward button of the player is clicked.   |
| onTrackItemSelect   | `function` | Called when user clicks on an audio in the audio list. Returns an object containing the details about the selected audio track. |


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
