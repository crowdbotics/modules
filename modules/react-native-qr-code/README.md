# QR code
Qr code generator is helps user generate qr-code by taking picture and entering text.

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
  }
```

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import QRCode from "@modules/qr-code";

const { title, navigator } = QRCode;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const QRCode = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<QRCode />
```

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1gAIZIbwjafGHy-jzjMHVckhzud-kS-DswQ0UT4Zk9JM/edit?usp=sharing), which provides more information about the module's actual intentions.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)