# Splash-v2 Module
The Splash Module is a React Native based splash Module, by that means, it truly isn't executed until after the app
is fully loaded. If it's desired to appear during load, you will need to build a native screen in both Android and iOS directories of the project.

## Params

Below is the list of all Params with data types that are considered primitive or the basic ones needed for the module to work.

| Params              | Data Types         | Description                                                       |
| -----------------------|:------------------:|:---------------------------------------------------------------|
| url (required)         | String             | URL of the splash/logo image to be displayed on splash screen  |
| duration (milliseconds)| Number             | Duration for Splash screen to be displayed                     |
| onDurationEnd          | Callback Function()| A Function to navigate to other screen as the duration ends.   |
| mainContainerStyle     | Object             | You can style image container according to your need.          |
| imageResizeMode        | String             | Set image resizeMode (contain\|cover\|stretch\|repeat\|center) |
| imageStyle             | Object             | Set splash image styles according to your need                 |


## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Splash from "@modules/splash-upgrade";

const { title, navigator } = Splash;

```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';

const Splash = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<Splash url='' duration = {millisecs} onDurationEnd = {Func} mainContainerStyle={Object} imageResizeMode='' imageStyle={Object}/>;

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
