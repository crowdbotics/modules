# Splash Module
The Splash Module is a React Native based splash Module, by that means, it truly isn't executed until after the app
is fully loaded. If it's desired to appear during load, you will need to build a native screen in both Android and iOS directories of the project.

## Usage
you can use the component by calling it, where it is needed, and pass the required props in the component.

```javascript

const handleNavigate = () =>{
    navigation.navigate('HOME_SCREEN')
}

<Splash url='https:project/a1c8dd140bc4.png' duration = {5000} onDone = {handleNavigate}/>;

```

## Required Props

Below is the list of all required props with their data types that are considered primitive or the basic ones needed for our module to work.

| Required Props| Data Types    | Description                                                     |
| ------------- |:-------------:| ---------------------------------------------------------------:|
| url           | String        | URL of the splash/logo image to be displayed on splash screen   |
| duration      | Number        | Duration for Splash screen to be displayed                      |
| onDone        | Function      | A Function to navigate to other screen as the duration ends.    |


## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Splash from "@modules/splash-upgrade";

const { title, navigator } = Splash;

```


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
