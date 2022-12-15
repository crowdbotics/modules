# Fingerprint Authentication module
Fingerprint Authentication module is React Native based module, which helps user to verify a person's identity based on one or more of their fingerprints.


## Manual Configuration
### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`.

2. Go to `node_modules` ➜ `react-native-fingerprint-scanner` and add `ReactNativeFingerprintScanner.xcodeproj`.

3. In XCode, in the project navigator, select your project. Add `libReactNativeFingerprintScanner.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`.

4. Run your project `(Cmd+R)`


### Android

1. Append the following lines to android/settings.gradle

```
include ':react-native-fingerprint-scanner'
project(':react-native-fingerprint-scanner').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fingerprint-scanner/android')
```

2. Insert the following lines inside the dependencies block in android/app/build.gradle.

```
implementation project(':react-native-fingerprint-scanner')
```

3. In your AndroidManifest.xml:
API level 28+ (Uses Android native BiometricPrompt) 

```
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```
API level 23-28 (Uses Android native FingerprintCompat)
```
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
```



## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import FingerprintAuthentication from "@modules/fingerprint-authentication";

const { title, navigator } = FingerprintAuthentication;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const FingerprintAuthentication = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<FingerprintAuthentication onAuthentication={"any callback function"} .../>
```

## Params

Below is the list of all params that can be passed to the module.

| Name            | Type       | Description                                                    |
| --------------- |:----------:|:---------------------------------------------------------------|
| onAuthentication| `function` | Called after successfully fingerprint authentication.|
| onAuthenticationError| `function` | Called fingerprint authentication gets failed by any reason.  |


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
