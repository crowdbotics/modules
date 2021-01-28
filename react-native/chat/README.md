# Maps

# Setup

Install the required dependencies:

```sh
yarn add moment prop-types pubnub-react react-native-gifted-chat react-native-keyboard-aware-scroll-view uuid
```

Open `/src/navigator/mainNavigator.js` and import the stack navigator defined in `navigator.js`.

```javascript
import Chat from "../features/<module_directory>/navigator.js";
```

And then add it to the navigation:

```javascript
//@BlueprintImportInsertion
Chat: {
  screen: Chat
},
```

# Based on pubnub/tutorial-app-react-native

https://github.com/pubnub/tutorial-app-react-native
