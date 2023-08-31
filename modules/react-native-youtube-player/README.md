# Youtube Player React native specs

## Module description

The Youtube Player Module is a React Native-based module which embeds a youtube video into your react native app.

- Change the quality of video.
- Pause the video.
- Fullscreen mode.
- Play video on loop.
- Previous and Next options.
- Share the video.

![image](https://github.com/cbshoaib/modules/assets/76822297/49126e0d-80ea-462a-8f04-45c42aeff901)


## ## Features

 - [x] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

For keys and credientials setup the following steps are given:
1. Signup or login into `Google Console account`.
2. From your dashboard, on the top left side, click on `menubar` then go to `api & services` => `library`.
3. After that click on `search menubar` and search for "youtube data api" and enable it.
![console cloud google](https://user-images.githubusercontent.com/120275623/228167168-7c7d9091-2f0c-4390-9037-278efc0b77be.png)
4. Generate a `key` and save it.


## Dependencies

Dependencies used:
 - react-native-youtube  -  https://www.npmjs.com/package/react-native-youtube
 - react-native-vector-icons  -  https://www.npmjs.com/package/react-native-vector-icons
 - prop-types  -  https://www.npmjs.com/package/prop-types

## ## Module Options

### Global Configs

No global configs required.

### Local Configs

Move into the options file and update your youtube api key and replace the given VIDEOS_IDS array with your own.
```javascript

const YOUTUBE_API_KEY = "Your youtube api key";
const VIDEOS_IDS = ["uMK0prafzw0"];

```

### Android setup

#### For `Android 11` and above

Add these lines in `AndroidManifest.xml`

```xml
<queries>
<package android:name="com.google.android.youtube" />
</queries>
```

### iOS setup

No iOS setup required.
