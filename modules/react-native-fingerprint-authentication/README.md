# Fingerprint Authentication module

Fingerprint Authentication module is React Native based module, which helps user to verify a person's identity based on one or more of their fingerprints.

## Dependencies

Dependencies used:
- [react-native-touch-id](https://npmjs.org/package/react-native-touch-id)

## Manual Setup


### Android setup

1. In your AndroidManifest.xml:
API level 28+ (Uses Android native BiometricPrompt)

```xml
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```
API level 23-28 (Uses Android native FingerprintCompat)
```xml
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
```

### iOS setup

1. Add this line with path to your `node_modules` in `podfile`
```powershell
pod 'TouchID', :path => "#{node_modules_path}/react-native-touch-id"
```
2. Add these lines for `faceId` support in `info.plist`
```xml
<key>NSFaceIDUsageDescription</key>
<string>Enabling Face ID allows you quick and secure access to your account.</string>
```
2. Now run `pod install`
3. Run your project `(Cmd+R)`


## API Details

Below is the list of all params that can be passed to the module.

| Name            | Type       | Description                                                    |
| --------------- |:----------:|:---------------------------------------------------------------|
| onAuthentication| `function` | Called after successfully fingerprint authentication.|
| onAuthenticationError| `function` | Called fingerprint authentication gets failed by any reason.  |


## Module Specifications
Here is the m[Module Specification DOcument](https://docs.google.com/document/d/1mKZg1T2piDlQHnpUkY09_oSbQjxSCtu-xRPysLvAORU/edit?usp=sharing), which provides more information about the module's actual intentions.
