# Chat React native specs

## Module description

This react-native based module allows user to see their current chats, create group chats and chat 1 on 1.

- Create group chats
- Remove group members
- Leave group
- Create direct chats
- Send images and videos
- Change chat icon.
- Block user
- Search channels
  
![image](https://github.com/cbshoaib/modules/assets/120275623/a68bc9dd-3a97-4189-8586-021cbc545f96)

## ## Features

 - [x] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [ ] This module can be configured with module options.
 - [ ] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

The following are the steps for credientails setup:
1. Login to [PubNub site](https://admin.pubnub.com/#/login)
2. Click on `Create New App` button
3. Enter the App Name and click `Create` button.
4. Click on the app that you have created.
5. Copy the `Publish Key`, `Subscribe Key` and `Secret Key` and save them for later use. 
![pubnub](https://user-images.githubusercontent.com/120275623/228430230-e9eb0b29-3b90-4361-b9a2-536a8abc6bfc.png)

## Dependencies

Dependencies used:
- pubnub - https://www.npmjs.com/package/pubnub
- zustand - https://www.npmjs.com/package/zustand
- pubnub-react - https://www.npmjs.com/package/pubnub-react
- is-url - https://www.npmjs.com/package/is-url
- react-native-gifted-chat - https://www.npmjs.com/package/react-native-gifted-chat
- uuid - https://www.npmjs.com/package/uuid
- react-native-popup-menu - https://www.npmjs.com/package/react-native-popup-menu
- react-native-video - https://www.npmjs.com/package/react-native-video
- react-native-fs - https://www.npmjs.com/package/react-native-fs
- react-native-emoji-selector - https://www.npmjs.com/package/react-native-emoji-selector
- react-native-image-picker - https://www.npmjs.com/package/react-native-image-picker
- react-native-image-crop-picker - https://www.npmjs.com/package/react-native-image-crop-picker
- @react-native-community/checkbox - https://www.npmjs.com/package/@react-native-community/checkbox
- react-native-linear-gradient - https://www.npmjs.com/package/react-native-linear-gradient
- react-native-permissions - https://www.npmjs.com/package/react-native-permissions

## ## Module Options

### Global Configs

No global configs required.

### Local Configs

Update these in `options.js` 

```js
PUBNUB_PUB = "..."
PUBNUB_SUB = "..."
ENDPOINT = "..."
FILESTACK_KEY = "..."
```
### Android setup

No android setup required.
### iOS setup

No iOS setup required.
