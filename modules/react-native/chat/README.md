# Maps

# Setup

Install the required dependencies:

```sh
  "dependencies": {
    "pubnub": "^4.29.11",
    "pubnub-react": "^2.1.0",
    "react-native-emoji-selector": "^0.2.0",
    "react-native-keyboard-aware-scroll-view": "^0.9.3"
  }
```

Open `/src/navigator/mainNavigator.js` and import the stack navigator defined in `index.js`.

```javascript
import Chat from "../features/<module_directory>";
```

And then add it to the navigation:

```javascript
//@BlueprintImportInsertion
Chat: {
  screen: Chat.navigator
},
```

# Based on pubnub/tutorial-app-react-native

https://github.com/pubnub/tutorial-app-react-native
