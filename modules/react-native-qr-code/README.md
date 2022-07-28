# QR code
Qr code generator is helps user generate qr-code by taking picture and entering text.


## Installation


### Android configurations

1. On Android you must ask for camera permission. Add following line in `AndroidManifest.xml`.

```
<uses-permission android:name="android.permission.CAMERA" />
```

2. Insert the following line in android/app/build.gradle into defaultConfig section.

```
 missingDimensionStrategy 'react-native-camera', 'general'
```

### IOS configurations

1. On iOS, you must update Info.plist with a usage description for camera.

```
...
<key>NSCameraUsageDescription</key>
<string>Your own description of the purpose</string>
...
```

### Update api url in options/options.js

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this: 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
  {}
```


## Feature

# Qr code scanner
user can scan a qr code

# Qr code generator
user can generate a qr code via backend
