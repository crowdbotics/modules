# Photo Editing
The module allows users to edit photo, by applying filters, contrast, opacity, resizing, crop etc.

## Features

This module contains the following list of features.
* Crop
* Filters
* Edits
* Shadows

### Crop
Image can be cropped by given Aspect ratios.
1. 1.1
2. 2.3
3. 3.2
4. 3.4
5. 4.3
6. 4.5

### Filters
List of filters that can be applied to the photo.
1. Warm
2. Classic
3. Vintage
4. Sharp
5. Negative
6. Bright
7. Cool

### Edits
List of effects to edit the image.
1. Contrast
2. Saturation.
3. Brightness
4. Temperature

### Shadows
Add Shadows to the image by adjusting 
1. Blur
2. Blur Passes
3. List of Maps

## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` and `x-dependencies` section and past them in your project's main `package.json` file.
Here are the required packages for the module:
```
    "gl-react" : "^4.0.1",
    "gl-react-native" : "^4.0.1",
    "react-native-gl-image-filters": "0.5.0",
    "react-native-unimodules": "0.13.3",
    "@react-native-community/slider": "4.2.2",
    "react-native-image-resizer": "1.4.5",
    "react-native-image-picker": "4.8.3",
    "@react-native-community/cameraroll": "4.1.2",
    "@react-navigation/native-stack": "6.5.0",
    "react-native-screens": "3.10.2",
    "react-native-calendars": "1.1282.0"
```
and run this command.
  ```
  yarn install
  ```
  
## Configuration for Android

### Configuration for react-native-unimodules

1. Open up android/app/src/main/java/[...]/MainApplication.java. Add following lines to the imports at the top of the file.
```
    import com.demo.generated.BasePackageList;
    import java.util.Arrays;
    import org.unimodules.adapters.react.ModuleRegistryAdapter;
    import org.unimodules.adapters.react.ReactModuleRegistryProvider;

```
2. Add following lines of code in android/app/src/main/java/[...]/MainApplication.java as well.

```
    private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), null);
```

2. Add following lines of code in android/app/src/main/java/[...]/MainApplication.java as well.

Add below lines in getPackages function

```
    List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
            new ModuleRegistryAdapter(mModuleRegistryProvider)
          );
          packages.addAll(unimodules);
```

3. Append the following lines to android/settings.gradle.

```
    apply from: new File(["node", "--print", "require.resolve('react-native-unimodules/package.json')"].execute(null, rootDir).text.trim(), "../gradle.groovy"); includeUnimodulesProjects()
    apply from: new File(["node", "--print", "require.resolve('@react-native-community/cli-platform-android/package.json')"].execute(null, rootDir).text.trim(), "../native_modules.gradle"); applyNativeModulesSettingsGradle(settings)

```

4. Add following lines in android/app/build.gradle.

```
    apply from: '../../node_modules/react-native-unimodules/gradle.groovy'
```

5. Add this line in dependencies block in android/app/build.gradle.

```
    dependencies{
        addUnimodulesDependencies()
    }
```


### Configuration for @react-native-community_camerarol

1. Open up android/app/src/main/java/[...]/MainApplication.java. Append the given lines to imports.

```
    import com.reactnativecommunity.cameraroll.CameraRollPackage;

```
2. Append the following lines to android/settings.gradle.

```
    include ':@react-native-community_cameraroll'
    project(':@react-native-community_cameraroll').projectDir = new File(rootProject.projectDir, 	'../node_modules/@react-native-community/cameraroll/android')
```
3. Add android:requestLegacyExternalStorage="true" to AndroidManifest.xml.

```
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

```
```
    <application  android:requestLegacyExternalStorage="true" /> 
    </application>
```

### Update buildScript in android/build.gradle
In android/build.gradle update your `buildTools`, `compileSdkVersion` and `targetSdkVersion` to at least version 30.
```javascript

buildToolsVersion = "30.0.3"
compileSdkVersion = 30
targetSdkVersion = 30

```

## Configuration for iOS

### Configuration for react-native-unimodules

1. In ios/MyApp/AppDelegate.h
```
- @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate> //remove this line

+ #import <UMCore/UMAppDelegateWrapper.h>                                         //add these two lines
+ @interface AppDelegate : UMAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>
```

2. In ios/MyApp/AppDelegate.m add following lines:

```
#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>
```

```
@interface AppDelegate () <RCTBridgeDelegate>
 
@property (nonatomic, strong) UMModuleRegistryAdapter *moduleRegistryAdapter;
 
@end
```
```
  self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];
```

```
[super application:application didFinishLaunchingWithOptions:launchOptions];
```

```
- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
    NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge];
    // If you'd like to export some custom RCTBridgeModules that are not Expo modules, add them here!
    return extraModules;
}
```

3. In ios/Podfile 
```
//Remove these two lines
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

//Add these lines
require File.join(File.dirname(`node --print "require.resolve('react-native/package.json')"`), "scripts/react_native_pods")
require File.join(File.dirname(`node --print "require.resolve('@react-native-community/cli-platform-ios/package.json')"`), "native_modules")
require File.join(File.dirname(`node --print "require.resolve('react-native-unimodules/package.json')"`), "cocoapods")
```
```
 platform :ios, '10.0' //remove this line
 platform :ios, '11.0' //add this line
```
```
 use_unimodules! //add this line
```
4. Install pods
```
npx pod-install
```

### Configuration for @react-native-community_camerarol

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@react-native-community/cameraroll` and add `RNCCameraroll.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCCameraroll.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project `(Cmd+R)`<


## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import PhotoEditing from "@modules/photo-editing";
const { title, navigator } = PhotoEditing;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const PhotoEditing = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<PhotoEditing  />
```

## Module Specifications
Here is the m[Module Specification DOcument](https://docs.google.com/document/d/1yQif_n5127CpRxgsdMBsvn1qgQvQUfDXxttcCDx9Z10/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)