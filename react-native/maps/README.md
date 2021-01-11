# Maps

## Setup

Open `/src/navigator/mainNavigator.js` and import the stack navigator defined in `navigator.js`.

```javascript
import Maps from "../features/<module_directory>/navigator";
```

And then add it to the navigation:

```javascript
//@BlueprintImportInsertion
Maps: {
  screen: Maps
},
```

Update the map's initial location in:
`src/features/<module_directory>/index.js`

This is the default value (San Francisco):

```javascript
const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
```
