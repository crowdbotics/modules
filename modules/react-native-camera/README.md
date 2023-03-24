# Camera
Camera module is a React Native based module, which allows users to capture, upload and see their list of uploaded images. Images can be uploaded from the gallery or can be captured using device camera.

## Features
1. Store/upload images to the database against a specific user
2. Retrieve images from the database against a specific user
3. Capture image using device camera
4. Access images from device gallery


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

## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` section and past them in your project's main `package.json` file, and run this command.
  ```
  yarn install
  ```

## API Calling Methods
All the api calling methods reside in `utils.js` file.

* ****
`sendVerification` method takes an object containing method `email`, `phone_number`. Sends opt to the user via the provided method.

* **uploadImage**
`uploadImage` method as uploads the image to the database. Gets object of image containing name, type uri and data about the image. Image can be selected for the gallery or can be captured using device camera.

* **fetchImages**
`uploadImage` method is used to retrieve the images from database. Returns array of the images uploaded by the user.


## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Camera from "@modules/camera";

const { title, navigator } = Camera;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const Camera = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Camera />
```

### Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/197btS3Arq50GvivzCuCwOOp299E6i10O67jMBt3ZfoI/edit), which provides more information about the module's actual intentions.

### Postman Collection for Module APi Endpoints
Here is a collection of all the api endpoints for the module.
[Camera Module Postman Collection](https://drive.google.com/file/d/1fDxG_ZG0uz7889G8LpZqClrlny4LqxpR/view?usp=share_link)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)