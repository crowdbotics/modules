# Image Gallery Module
Image Gallery is a React-native based module for accessing and displaying images, albums and videos from the device.

## Features

1. List all photos, albums, and videos:
2. Display photos from a specific album or group:
3. Display a limited number of photos and videos:
4. Display photos and videos within a specific time span:
5. Display photos according to sizes and location:
6. Display photos and videos in different ranges:
7. Filter photos and videos by their creation time:


## Required Dependencies
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. 
Keep the below packages in project's package.json file.
```
  "@react-native-camera-roll/camera-roll" : "5.0.2",
  "prop-types": "15.8.1"
```
RUn the command to install dependencies:
  ```
  yarn install
  ```


## Installation
### Android
1. In `android/app/src/main/AndroidManifest.xml` add the permissions required to read and write to the external storage:


```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```



### IOS
1. `iOS 10` or later. 
Add the `NSPhotoLibraryUsageDescription` key in your `Info.plist` with a string that describes how your app will use this data. This key will appear as `Privacy - Photo Library Usage Description` in Xcode.

2. `iOS 11` or later
 Add the `NSPhotoLibraryAddUsageDescription` key in your `Info.plist`. Use this key to define a string that describes how your app will use this data. 


## Local Configs
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

## Manual Setup
1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import ImageGallery from "@modules/image-gallery";

const { title, navigator } = ImageGallery;
```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';

const ImageGallery = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<ImageGallery />;
```

## Params

Below is the list of all Params with their data types that are considered primitive or the basic ones needed for our module to work.

| Params     | Data Types   | Description                                                       |
| -----------|:------------:|:---------------------------------------------------------------|
| first      | `number` |  The number of photos wanted in reverse order of the photo application. `Required`.|
| groupTypes | `string` |  Specifies which group types to filter the results to. Valid values are: `Album`, `All`// default, `Event`, `Faces`, `Library`, `PhotoStream`, `SavedPhotos`. |
| groupName  | `string` | Specifies filter on group names, like 'Recent Photos' or custom album titles. |
| assetType  | `string` | Specifies filter on asset type. Valid values are: `All` `Videos` `Photos //default`  |
| mimeTypes  | `array` | Filter by mimetype (e.g. image/jpeg). Note that using this will reduce performance slightly on iOS. |
| fromTime   | `number` | Filter by creation time with a timestamp in milliseconds. This time is exclusive, so we'll select all photos with ` timestamp > fromTime `. |
| toTime     | `string` |  Filter by creation time with a timestamp in milliseconds. This time is inclusive, so we'll select all photos with ` timestamp <= toTime `.|
| include    | `array` |  Whether to include some fields that are slower to fetch: Array might contain [`filename`, `fileSize`, `location`, `imageSize`, `playableDuration`]|


## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1XtxXJF1hFzAJSbN3llsxyfdOHjaAngnt4tJjHZhXuJw/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
