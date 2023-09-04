# QR code React native specs

## Module description

This module allows the user to generate qr-code by entering text and read a qr-code by taking a picture through device's camera.

- Generate a qr code by entering custom text
- Scan qr code through camera.

![image](https://github.com/saad-abid-crowdbotics/modules/assets/76822297/7605b2a5-8ec5-46d2-99b8-dba56ff39e92)

## Feature

### Qr code scanner
user can scan a qr code

### Qr code generator
user can generate a qr code via backend

## Required Dependencies
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. 
Keep the below packages in project's `package.json` file.
```
    "react-native-camera": "4.2.1",
    "react-native-pager-view": "5.4.15",
    "react-native-tab-view": "3.1.1",
    "@react-navigation/native-stack": "6.5.0",
    "react-native-screens": "3.10.2",
    "react-native-qrcode-scanner": "1.5.5",
    "react-native-permissions": "^2.0.10"
```
RUn the command to install dependencies:
  ```
  yarn install
  ```

## API Calling Methods
All the api calling methods reside in `api/index.js` file.

* **getQr**
`getQr` method takes an object containing `text` and sends it to backend to generate qrcode. Returns generated qrcode in image form.



## ## Features

 - [ ] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [ ] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [x] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account creation is required

## Dependencies

Dependencies used:

- react-native-camera  -  https://www.npmjs.com/package/react-native-camera
- react-native-pager-view  -  https://www.npmjs.com/package/react-native-pager-view
- react-native-tab-view  -  https://www.npmjs.com/package/react-native-tab-view
- @react-navigation/native-stack  -  https://www.npmjs.com/package/@react-navigation/native-stack
- react-native-screens  -  https://www.npmjs.com/package/react-native-screens
- react-native-qrcode-scanner  -  https://www.npmjs.com/package/react-native-qrcode-scanner
- react-native-permissions  -  https://www.npmjs.com/package/react-native-permissions


## ## Module Options

### Global Configs

Update the ``options/options.js`` file with your app's backend url.
```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs

No local configs required

### Android setup

1. On Android you must ask for camera permission. Add following line in `AndroidManifest.xml`.

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

2. Insert the following line in android/app/build.gradle into defaultConfig section.

```powershell
 missingDimensionStrategy 'react-native-camera', 'general'
```


### iOS setup

1. On iOS, you must update Info.plist with a usage description for camera.

```xml
...
<key>NSCameraUsageDescription</key>
<string>Your own description of the purpose</string>
...
```
