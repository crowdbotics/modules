# Side Drawer module
React Native based module that renders a navigation drawer which can be opened and closed via gestures.

## Features
Navigation between screens

## Required Dependencies
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. 
Keep the below packages in project's package.json file.
```
    "@react-navigation/drawer": "^5.12.9",
    "prop-types" : "15.8.1"
```
RUn the command to install dependencies:
  ```
  yarn install
  ```

## Local Configs
in `modules/side-drawer/options.js` provide the `screenSet` and `drawerOptions`.

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


## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import SideDrawer from "@modules/side-drawer";

const { title, navigator } = SideDrawer;
```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';

const SideDrawer = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<SideDrawer />;
```

## Params

Below is the list of all Params with their data types that are considered primitive or the basic ones needed for our module to work.

| Params            | Data Types         | Description                                                       |
| ------------------|:------------------:|:---------------------------------------------------------------|
| screenSet         | `array`  | Array of screen objects, each object contains screen name, component, and options for the screen. More detail is given below.|
| drawerType        | `string` | Type of the drawer. It determines how the drawer looks and animates. You can select `front | back | slide| permanent`. |
| initialRouteName  | `string` | The name of the route to render on first load of the navigator.   |
| screenOptions| `object`      | Default options to use for the screens in the navigator.|
| drawerPosition    | `String` | Options are left or right. Default is left position.     |
| drawerStyle       | `Object` | Style object for the drawer component. You can pass a custom background color for a drawer or a custom width here. |
| overlayColor      | `string` | Color overlay to be displayed on top of the content view when drawer gets open.|
| hideStatusBar     | `boolean` | When set to true Drawer component will hide the OS status bar whenever the drawer is pulled or when it's in an "open" state. |
| edgeWidth         | `number` | Allows for defining how far from the edge of the content view the swipe gesture should activate. |
| keyboardDismissMode| `string` | Whether the keyboard should be dismissed when the swipe gesture begins. Defaults to 'on-drag'. Set to 'none' to disable keyboard handling. |
| minSwipeDistance  | `number` | Minimum swipe distance threshold that should activate opening the drawer. |


### Param `screenSet`
**screenSet**  will have objects in it. Each object will contain the screen details. The final screenSet array will look like this:

```
const screenSet = [
    {
        name: string,
        component: function,
        options: {          
            title: string,              // Generic title that can be used as a fallback for headerTitle and drawerLabel
            swipeEnabled: boolean,      // Whether you can use swipe gestures to open or close the drawer.
            gestureEnabled: boolean,    // Whether you can use gestures to open or close the drawer.
            drawerLabel: string,        //String to display in drawer sidebar.
            drawerIcon: function        //Function returns a React.Node, to display in drawer sidebar
        }
    },
    ...
]
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
