# Terms & Conditions React native specs

## Module description

The Terms and Conditions module is a React Native based module which recieves HTML content from backend and simply renders it.

- Retrieve terms and conditions content from database and display for the app user.

![image](https://github.com/saad-abid-crowdbotics/modules/assets/120275623/57413328-ca2b-43f0-b816-61ce0b09e564)


## ## Features

 - [ ] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [ ] This module can be configured with module options.
 - [ ] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account required.

## Dependencies

Dependencies used:
- react-native-render-html  -  https://www.npmjs.com/package/react-native-render-html 

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

No android setup required


### iOS setup

No iOS setup required
