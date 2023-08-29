# Side Drawer React native specs

## Module description

This is a React Native based module that renders a navigation drawer which can be opened and closed via gestures.

- Navigation between screens
- Open and close drawer with gestures.

![image](https://github.com/saad-abid-crowdbotics/modules/assets/120275623/dae04e08-c117-4b0c-b075-224967b247dd)

## ## Features

 - [ ] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [ ] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account required.

## Dependencies


Dependencies used:
- @react-navigation/drawer - https://www.npmjs.com/package/@react-navigation/drawer?activeTab=versions
- prop-types - https://www.npmjs.com/package/prop-types

## ## Module Options

### Global Configs

No global configs required.

### Local Configs

In `modules/side-drawer/options.js` provide the `screenSet` and `drawerOptions`.

```javascript
const screenSet = [
    {
        name: 'Home',
        component: HomeScreen,
        options: {}
    },
    ...
]

const drawerOptions = {
	initialRouteName : 'Basket',
	drawerType : 'front',
	screenOptions: {},
	drawerPosition : 'left',
	drawerStyle : {},
	overlayColor : 'transparent',
	hideStatusBar : false,
	edgeWidth : 300,
	keyboardDismissMode : 'on-drag',
	minSwipeDistance : 300,
}
```

### Android setup

No android setup required.


### iOS setup

No iOS setup required.
