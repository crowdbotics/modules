# Splash React native specs

## Module description

This is a react native based module which integrates a splash screen into your app.

- Add splash screen to app with your custom component.

![image](preview.png)

## ## Features

 - [ ] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [x] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account required.

## Dependencies

Dependencies used:
- react-native-splash-screen - https://www.npmjs.com/package/react-native-splash-screen
- prop-types - https://www.npmjs.com/package/prop-types
## ## Module Options

### Global Configs

No global configs required.

### Local Configs

In modules/splash.options.js you can update following options:

```js
const duration = null; // In milliseconds
const onDurationEnd = null;// Callback function will be called as your duration ends and splash screen disappears.
```

### Android setup

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



### iOS setup

1. cd ios

2. run pod install

3. Update `AppDelegate.m` with the following additions:

#### For Old Scaffold `v0.64`

```c
#import "RNSplashScreen.h"  //add here

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...other code

    [RNSplashScreen show];  // add here
    return YES;
}
```

#### For New Scaffold `v0.71`

```c
#import "RNSplashScreen.h"  //add here

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ...other code

  // add this line
  bool didFinish=[super application:application didFinishLaunchingWithOptions:launchOptions];

  [RNSplashScreen show];  // add this
  return didFinish; // Return didFinish instead of [super application:application didFinishLaunchingWithOptions:launchOptions];
}
```
