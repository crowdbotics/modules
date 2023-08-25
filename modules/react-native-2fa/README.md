# Two Factor Authentication React native specs

## Module description

Two Factor Authentication module, will implement a two-factor authentication flow, which will prompt for username/email and password and then a time-based generated code. 

 - Send OTP
 - Verify by email
 - Verify by sms
 - Verification by 2fa
 - Setup Google authenticator on same device
 - Scan google authenticator qr code.
 - Resend code.

![image](https://github.com/cbshoaib/modules/assets/76822297/90d09b9d-5ff5-456f-bcab-902b745bdc78)


## ## Features

 - [ ] This module includes environment variables.
 - [ ] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [ ] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account setup required.

## Dependencies

Dependencies used:
   - react-native-qrcode-svg  -    https://www.npmjs.com/package/react-native-qrcode-svg
   - react-native-svg  - https://www.npmjs.com/package/react-native-svg
   - react-native-country-picker-modal  - https://www.npmjs.com/package/react-native-country-picker-modal
   - react-native-dropdown-picker  -  https://www.npmjs.com/package/react-native-dropdown-picker

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

No local config required.

### Android setup

No android config required.

### iOS setup

No iOS config required.
