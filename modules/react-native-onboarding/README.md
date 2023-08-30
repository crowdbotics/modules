# Onboarding React native specs

## Module description

This is a ReactNative based module which can be configured to have one or multiple
slide screens with content and expansion detailed in the file.

- Educate the user about the functions and benefits of the app

![image](https://github.com/cbshoaib/modules/assets/120275623/51a3b33c-f09e-4293-9129-d05e3f44176a)

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
 - react-native-app-intro-slider - https://www.npmjs.com/package/react-native-app-intro-slider
 - prop-types - https://www.npmjs.com/package/prop-types

## ## Module Options

### Global Configs

No global configs required.

### Local Configs

Your `slidesData` array should look something like this.

```javascript
const slidesData = [
  {
    key : 1,
    title: "Title 1",
    description: "Description.\nSay something cool",
    imageURL: "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png",
    backgroundColor: "#59b2ab"
  },
  ...
]
```


### Android setup

No android setup required.

### iOS setup

No iOS setup required.
