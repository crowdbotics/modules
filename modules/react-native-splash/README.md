# Splash Module
The Splash Module is a React Native based splash Module, by that means, it truly isn't executed until after the app
is fully loaded. If it's desired to appear during load, you will need to build a native screen in both Android and iOS directories of the project.


## Installation
### Android
1. Update the `MainActivity.java` to use react-native-splash-screen via the following changes:

```java
import android.os.Bundle; 
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    //Add this method
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    //Other code...
}
```

2. Create a file called `launch_screen.xml` in `app/src/main/res/layout` (create the layout-folder if it doesn't exist). The contents of the file should be the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/launch_screen"
    android:orientation="vertical">

</LinearLayout>
```

3. Create `drawable-xhdpi` and `drawable-xxhdpi` folders at `app/src/main/res/` and add your `launch_screen.png` file in these folders. This `launch_screen.png` file will be your splash image will be loaded as your app starts.


4. Add a color called primary_dark in `app/src/main/res/values/colors.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_dark">#000000</color>
</resources>
```

### IOS
1. cd ios

2. run pod install

3. Update `AppDelegate.m` with the following additions:

```c
#import "RNSplashScreen.h"  //add here

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...other code

    [RNSplashScreen show];  // add here
    return YES;
}
```

## Manual Setup
1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Splash from "@modules/splash";

const { title, navigator } = Splash;
```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';
const Splash = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Splash duration = {millisecs} onDurationEnd = {Func}/>;
```
## Local Configs
in modules/splash.options.js you can update following options:

```javascript

const duration = null; // In milliseconds
const onDurationEnd = null;// Callback function will be called as your duration ends and splash screen disappears.

```
## Params

Below is the list of all Params with their data types that are considered primitive or the basic ones needed for our module to work.

| Params              | Data Types         | Description                                                       |
| -----------------------|:------------------:|:---------------------------------------------------------------|
| duration (milliseconds)| Number             | Duration for Splash screen to be displayed                     |
| onDurationEnd          | Callback Function()| A Function to navigate to other screen as the duration ends.   |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
