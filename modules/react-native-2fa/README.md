# Two Factor Authentication
 Two Factor Authentication module, will implement a two-factor authentication flow, which will prompt for username/email and password and then a time-based generated code. 
## Documentation


### Update api url in options/options.js

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this: 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

## Required Dependencies
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. 
Keep the below packages in project's `package.json` file.
```
  "react-native-qrcode-svg": "6.1.2",
  "react-native-svg":"12.3.0"
  "react-native-country-picker-modal":"2.0.0",
  "react-native-qrcode-svg": "6.1.2",
  "react-native-svg":"12.3.0",
  "react-native-dropdown-picker": "^5.4.6"
```
RUn the command to install dependencies:
  ```
  yarn install
  ```

## API Calling Methods
All the api calling methods reside in `store/index.js` file.

* **sendVerification**
`sendVerification` method takes an object containing method `email`, `phone_number`. Sends opt to the user via the provided method.

* **verifyCode**
`verifyCode` method takes object containing `method` and `code` that was sent to user to be verified.
If user gets verified successfully, redirect user to home page of the application.

* **getGoogleAuthenticatorQR**
`getGoogleAuthenticatorQR` method is used return the QR code link which you can use to register on Google Authenticator App.

* **enableAuthentication**
`enableAuthentication` method takes an object containing method `email`, `phone_number`, `google_authenticator` Sends opt to the user via the provided method.

* **verifyEnableAuthenticationCode**
`verifyEnableAuthenticationCode` method takes object containing `method` and `code` that was sent to user to be verified.
If user gets verified successfully, two factor authentication is enabled for that method and user is redirected to AuthTypes page of the application.

* **checkAuthenticationStatus**
`checkAuthenticationStatus` method returns the type of two factor authentication enabled for that particular user

* **disableAuthenticationStatus**
`disableAuthenticationStatus` method disables any type of two factor authentication which is enabled for that particular user
## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import TwoFactorAuthentication from "@modules/2fa";

const { title, navigator } = TwoFactorAuthentication;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const TwoFactorAuthentication = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<TwoFactorAuthentication />
```

## Features

### Send OTP
By clicking "Send OTP", the code is sent through the enabled authentication method
### Select verification method
By opening the dropdown, verification method to enable two factor authentication can be selected.

### Verification by email
By choosing the "Email" option, verification code is sent to user email.

### Verification by sms
By choosing the "sms" option, verification code is sent to user phone number.

### Verification by 2FA
By choosing the "2FA" option, authentication through google Authenticator generated token can be achieved.

### Set up 2FA on same device
By clicking "set up on same device", Google Authenticator account sets up automatically

### QR code 
By scanning the QR code, Google Authenticator account sets up automatically.

### Resend code
By clicking "Resend", the code is resent to Phone number or email


### Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1b0jb2yn19mH8lJ7vD-YiCDS4M0PUvt4Lnw3kc12D1pM/edit?usp=sharing), which provides more information about the module's actual intentions.

### Postman Collection for Module APi Endpoints
Here is a collection of all the api endpoints for the module.
[Two Factor Authentication Postman Collection](https://drive.google.com/file/d/1R-m8h6wODbENoABT2Pe2151xjMMtP91V/view?usp=share_link)

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

### License

[MIT](https://choosealicense.com/licenses/mit/)
