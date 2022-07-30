# Two Factor Authentication
 Two Factor Authentication module, will implement a two-factor authentication flow, which will prompt for username/email and password and then a time-based generated code. 
## Documentation

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


## Features

### Verify code 
By clicking "Verify", the code provided is verified against the code sent to phone number or email
### Select verification method
By clicking 'choose verification method', verification method can be selected for authentication

### Verification by email
By clicking the "Email" button, verification code is sent to user email.

### Verification by sms
By clicking the "sms" button, verification code is sent to user phone number.

### Verification by 2FA
By clicking the "2FA" button, authentication through google Authenticator generated token can be achieved.

### Set up 2FA on same device
By clicking "set up on same device", Google Authenticator account sets up automatically

### QR code 
By scanning the QR code, Google Authenticator account sets up automatically.

### Resend code
By clicking "Resend", the code is resent to Phone number or email


