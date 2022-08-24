# Navigation Tabs module

The Navigation tabs module is a React Native based module, helps the user to use dynamic tabs, set the position of tabs, change icons and customize styling. 


## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import NavigationTabs from "@modules/navigation-tabs";

const { title, navigator } = NavigationTabs;
```


2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const NavigationTabs = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<NavigationTabs  />
```

## Params

Below is the list of all params that can be passed to the module.

| Name                 | Type       | Description                                                    |
| ---------------------|:----------:|:---------------------------------------------------------------|
| tabList ` required ` | ` array ` | An array of objects, Each object contains properties ( `name`, `component`, `label`, `tabBarIcon`, `tabBarIconStyle`, `tabBarBadge`, `tabBarBadgeStyle`, `tabBarLabelStyle`, `tabBarItemStyle` ). |
| tabBarStyle​          | ` object ` | Style object for the tab bar. You can configure styles such as background color here. |
| tabBarShowLabel      | ` string ` | Whether the tab label should be visible. Defaults to true.       |
| tabBarLabelPosition  | ` below-icon or beside-icon ` | Whether the label is shown below the icon or beside the icon.|
| headerShown          | ` boolean ` | Whether to show or hide the header for the screen. The header is shown by default. Setting this to false hides the header.|
| tabBarActiveTintColor| ` string ` | Color for the icon and label in the active tab. |
| tabBarInactiveTintColor | ` string ` | Color for the icon and label in the inactive tab.|
| tabBarActiveBackgroundColor | ` string ` | Background color for the active tab. |
| tabBarInactiveBackgroundColor | ` string ` | Background color for the inactive tabs.|
| riseCenteredBtn      | ` boolean ` | Tab that is in center will be risen a bit from all the tab. Defaults to false. |


### Param ` tabList ` array of objects

The first param ` tabList ` is an array of objects. Each object in ` tabList ` array will have following properties inside it.

| Name              | Type     | Description                                                    |
| ------------------|:--------:|:---------------------------------------------------------------|
| name              | `string` | Name of the route to jump to                                |
| component         | `function` | screen components to be mounted.|
| label             | `string` | Title string of a tab displayed in the tab bar.              |
| tabBarIcon        | `function` | Function that returns a React.Node, to display in the tab bar.  |
| tabBarIconStyle   | `object` | A unique number for each object                                |
| tabBarBadge       | `string/number` | Text to show in a badge on the tab icon. Accepts a string or a number.|
| tabBarBadgeStyle  | `object` | Style for the badge on the tab icon. You can specify a background color or text color here.|
| tabBarLabelStyle  | `object` | Style object for the tab label.       |
| tabBarItemStyle   | `object` | Style object for the tab item container. |


Your finale `tabList` array will look something like this.

```javascript
const tabList = [
  {
     name: "Gallery",
      component: Gallery,
      label: "Gallery",
      tabIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="view-gallery" color={color} size={size} />
      ),
      tabBarIconStyle: {color: "black"},
      tabBarBadge: 2,
      tabBarBadgeStyle: {color: "black"},
      tabBarLabelStyle: {fontSize: 14},
      tabBarItemStyle:{backgroundColor: "blue"}
  },
  ...
]
```

## Local Configs
You can update the tabList in options file as well.
```
const tabList = [
  {
     name: "Gallery",
      component: Gallery,
      label: "Gallery",
      tabIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="view-gallery" color={color} size={size} />
      ),
      tabBarIconStyle: {color: "black"},
      tabBarBadge: 2,
      tabBarBadgeStyle: {color: "black"},
      tabBarLabelStyle: {fontSize: 14},
      tabBarItemStyle:{backgroundColor: "blue"}
  },
  ...
]
```
you can pass the props to the component by calling component like an inline function, like this:
```
const tabList = [
  {
    ...
    component: () => Gallery("1234"),
    ...
  },
  ...
]
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
