## Profile React native specs

## Module description

The Profile Module is a React Native based Module, module allows the user to view, delete and edit its own profile information.

The following scope features for this module:

- Create and update the user profile with details.
- Get the specific profile details.
- Delete the profile.

## Features

- [ ] This module includes environment variables.
- [x] This module requires manual configurations.
- [x] This module can be configured with module options.
- [ ] This module requires manual Android setup.
- [ ] This module requires manual iOS setup.

## 3rd party setup

No 3rd party account required.

## Dependencies

Dependencies used:
- react-native-document-picker - https://www.npmjs.com/package/react-native-document-picker

##  Module Options

### Global Configs
Update the ``options/options.js`` file with your app's backend url.
```js
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs
Update the value of the option in `options.js`:

```js
const userToken = "user_token";

```

### Android setup

No android setup required

### iOS setup

No iOS setup required