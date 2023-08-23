# Contact Us React native specs

## Module description

This module will be used by users for contacting the customer support or app owner

- User can contact the admin by filling the contact form.
- User can also send an email directly to admin through device's mail app.

![Module preview](https://github.com/crowdbotics/modules/blob/master/modules/react-native-contact-us/preview.png?raw=true)

## ## Features

 - [x] This module includes environment variables.
 - [ ] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [ ] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account setup required.

## Dependencies


Dependencies used:
- @react-navigation/native  -  https://www.npmjs.com/package/@react-navigation/native

- @react-navigation/native-stack  -  https://www.npmjs.com/package/@react-navigation/native-stack

## ## Module Options

### Global Configs

Update the options/options.js file with your app's backend url. 

```javascript
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs

Update local options in `modules/contact-us/options.js`

```javascript
export default {
  email: "admin@admin.com",
  textMessage: "textMessage"
};
```

### Android setup

No android setup required.


### iOS setup

No iOS setup required
