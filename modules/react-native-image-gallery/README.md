# Image Gallery React native specs

## Module description

Image Gallery is a React-native based module for accessing and displaying images, albums and videos from the device.

 - List all photos, albums, and videos:
 - Display photos from a specific album or group:
 - Display a limited number of photos and videos:
 - Display photos and videos within a specific time span:
 - Display photos according to sizes and location:
 - Display photos and videos in different ranges:
 - Filter photos and videos by their creation time:

![image](https://github.com/saad-abid-crowdbotics/modules/assets/76822297/3277be3a-9a3a-4862-9f79-e8cc2adecc2e)

## ## Features

 - [ ] This module includes environment variables.
 - [ ] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [x] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account creation required.

## Dependencies

Dependencies used:
 - @react-native-camera-roll/camera-roll - https://www.npmjs.com/package/@react-native-camera-roll/camera-roll
 - prop-types  -  https://www.npmjs.com/package/prop-types

## ## Module Options

### Global Configs

No global configs required

### Local Configs

In `modules/image-gallery/options.js` you can update `photoParams` options:

```javascript

const photoParams = {
  first: 20,
  assetType: 'Photos',
  after: '',
  groupTypes: 'All',
  groupName: '',
  mimeTypes: [],
  fromTime: 0,
  toTime: 0,
  include: []
};

```


### Android setup

1. In `android/app/src/main/AndroidManifest.xml` add the permissions required to read and write to the external storage:


```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```



### iOS setup

1. `iOS 10` or later. 
Add the `NSPhotoLibraryUsageDescription` key in your `Info.plist` with a string that describes how your app will use this data. This key will appear as `Privacy - Photo Library Usage Description` in Xcode.

2. `iOS 11` or later
 Add the `NSPhotoLibraryAddUsageDescription` key in your `Info.plist`. Use this key to define a string that describes how your app will use this data. 
