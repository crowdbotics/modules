# Camera React native specs

## Module description

Camera module is a React Native based module, which allows users to capture, upload and see their list of uploaded images. Images can be uploaded from the gallery or can be captured using device camera.

- Store/upload images to the database against a specific user
- Retrieve images from the database against a specific user
- Capture image using device camera
- Access images from device gallery

![image](https://github.com/saad-abid-crowdbotics/modules/assets/120275623/30fadb1a-46ef-4874-9665-c1feeac31817)

## ## Features

 - [ ] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [ ] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [x] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account creation required.

## Dependencies


Dependencies used:
 - react-native-actionsheet - https://www.npmjs.com/package/react-native-actionsheet
 - react-native-image-crop-picker  - https://www.npmjs.com/package/react-native-image-crop-picker
 - react-native-permissions  -  https://www.npmjs.com/package/react-native-permissions

## ## Module Options

### Global Configs

Update the `options/options.js` file with your app's backend url. 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs

No local configs required.

### Android setup


Add these lines to `android/app/src/main/AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### iOS setup


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
