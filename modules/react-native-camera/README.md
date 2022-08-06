# Camera
Camera module is a React Native based module, which allows users to capture, upload and see their list of uploaded images.

## Android Configs

Add these to `android/app/src/main/AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## iOS Configs

Add the following to `ios/Podfile`:

```ruby
    permissions_path = '../node_modules/react-native-permissions/ios'
    pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
    pod 'Permission-PhotoLibrary', :path => "#{permissions_path}/PhotoLibrary"
```

Add the following to `Info.plist`:

```xml-property-list
    <key>NSCameraUsageDescription</key>
    <string>Your message to user when the camera is accessed for the first time</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>Your message to user when the microphone is accessed for the first time</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Your message to user when the gallery is accessed for the first time</string>
```

Then from the root directory run:

```sh
cd ios
pod install
```

## Global Configs
### Update api url in options/options.js

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this: 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Camera from "@modules/payments";

const { title, navigator } = Camera;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const Camera = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Camera />
```
