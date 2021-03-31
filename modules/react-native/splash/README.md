# Splash Screen

The Splash Screen is a React Native based splash screen, by that means, it truly isn't executed until after the app
is fully loaded. If it's desired to appear during load, you will need to build a native screen in both Android and iOS directories of the project.

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Splash from "@modules/splash";

const { title, navigator } = Splash;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
