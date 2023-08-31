# Login React native specs

## Module description

The Login Module is a React Native-based module that enables users to conveniently log in or sign up directly within their application.

- Ability to log in/signup using a valid email and password.
- Ability to reset/forgot password - a recovery email link is generated on the registered email address.

![image](https://github.com/cbshoaib/modules/assets/76822297/ef8c9fce-8e05-4dbe-9b19-c89aa94c598c)

## ## Features

 - [x] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [ ] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account required.

## Dependencies

Dependencies used:
 - react-native-keyboard-aware-scroll-view  -  https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view
 - @react-navigation/native  -  https://www.npmjs.com/package/@react-navigation/native
 - @react-navigation/stack  -  https://www.npmjs.com/package/@react-navigation/stack
 - prop-types  -  https://www.npmjs.com/package/prop-types
 - @react-native-async-storage/async-storage  -  https://www.npmjs.com/package/@react-native-async-storage/async-storage

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

To set the screen to redirect to, open the module options file for the Login Module -- `modules/login/options.js`.Inside this file, change the `HOME_SCREEN_NAME` value to the string of the screen you want to redirect to.

### Android setup

No android setup required.

### iOS setup

No iOS setup required.
