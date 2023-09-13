# Social-Feed React native specs

## Module description

This react-native based module provides user a full social experience. Through this module users can follow each other, interact on oneanothers post and etc.

- Follow other users
- Upload images as post with caption
- Like and comment on posts
- Reply to comments
- View other users profile.
- View own profile and uploaded posts.

![image](https://raw.githubusercontent.com/crowdbotics/modules/a895d3a9241637125ea20c708306df6e05b02685/modules/social-feed/preview.png)

## ## Features

- [x] This module includes environment variables.
- [ ] This module requires manual configurations.
- [x] This module can be configured with module options.
- [x] This module requires manual Android setup.
- [x] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account required.

## Dependencies

Dependencies used:

- react-native-keyboard-aware-scroll-view - https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view
- @react-navigation/native-stack - https://www.npmjs.com/package/@react-navigation/stack
- react-native-screens - https://www.npmjs.com/package/react-native-screens
- react-native-actionsheet - https://www.npmjs.com/package/react-native-actions-sheet
- react-native-image-crop-picker - https://www.npmjs.com/package/react-native-image-crop-picker

## ## Module Options

### Global Configs

No global configs required.

### Local Configs

Update these in `options.js`

```js
//API Authentication token
const USER_TOKEN = "";
//APP's backend url
const BASE_URL = "";
```

### Android setup

Add the following to your `android/build.gradle` repositories section.

```gradle
      maven { url 'https://maven.google.com' }

      maven { url "https://www.jitpack.io" }
```

Add useSupportLibrary `android/app/build.gradle`

```gradle
android {
    ...

    defaultConfig {
        ...
        vectorDrawables.useSupportLibrary = true
        ...
    }
    ...
}
```

At last add these in your `AndroidManifest.xml`

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
//Photos permission for android 13.
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
```


### iOS setup

Update your `info.plist` file

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to upload photos.</string>
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take photos for uploads.</string>
```
