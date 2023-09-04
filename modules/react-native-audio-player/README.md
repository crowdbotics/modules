# Audio Player React native specs

## Module description

This react-native based module provides simple audio player functionalities i.e play, pause, download, next, previous and etc for both android and ios platforms.

- Play audios.
- Download the audio being played.
- Select audio to play from playlist.
- Play previous/next audio.

![image](https://github.com/saad-abid-crowdbotics/modules/assets/76822297/a5dca02b-31d4-449c-9173-1b7465383848)

## ## Features

 - [ ] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account required.

## Dependencies

Dependencies used:
- react-native-audio-recorder-player - https://www.npmjs.com/package/react-native-audio-recorder-player
- react-native-slider - https://www.npmjs.com/package/react-native-slider
- rn-fetch-blob - https://www.npmjs.com/package/rn-fetch-blob

## ## Module Options

### Global Configs

No global config required.

### Local Configs

In `modules/audio-player/options.js` you can update the list of audios to play:

```js

export const tracks = [
  {
      id: '', //Unique id for each track
      path: '', //URL of the audio
      title: '', //Title of the audio
      artwork: '', //Url of the image
      album: '', //Title for album
  },
```
### Android setup

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


### iOS setup

No manual setup for iOS required.
