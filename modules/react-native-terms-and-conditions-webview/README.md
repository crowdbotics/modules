# Terms And Conditions Webview React native specs

## Module description

The Terms And Conditions Webview is a React Native based Module which renders a Terms And Conditions page through a url.

- Ability to load and display terms and conditions from a url.

![image](https://github.com/cbshoaib/modules/assets/76822297/2100cd90-1e72-4f6a-8899-18a9ba585bb6)

## ## Features

 - [x] This module includes environment variables.
 - [ ] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [ ] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account required.

## Dependencies

Dependencies used:
- react-native-webview  -  https://www.npmjs.com/package/react-native-webview

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

In **modules/terms-and-conditions-webview/options.js** update `termsUrl` with your terms and conditions page url.

```javascript

const termsUrl = "";

```

### Android setup

No android setup required

### iOS setup

No iOS setup required
