# FCM Module

Using FCM module, you can notify a client app that a new email or other data is available to sync. You can send notification messages to drive user re-engagement.

Features included:
- User is able to receive notifications from Firebase.
- User is able to increase Message Visibility
- User is able to view the list of received notifications
- User is able to push alerts to remind users

## Features

- [ ] This module includes environment variables.
- [x] This module requires manual configurations.
- [x] This module can be configured with module options.
- [x] This module requires manual Android setup.
- [x] This module requires manual iOS setup.

## Module Options

### Global Configs

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this:

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs

In modules/fcm/options.js update the authToken:
```
const authToken = "Your Authorization token";
const userID = 1;
```

## Configurations for Android
1. On the Firebase console, add a new Android application and enter your projects details. The "Android package name" must match your local projects package name which can be found inside of the manifest tag within the /android/app/src/main/AndroidManifest.xml file within your project.


2. Download the google-services.json file and place it inside of your project at the following location: /android/app/google-services.json.


3. Add the google-services plugin inside of your /android/build.gradle file:
```gradle
buildscript {
    repositories {

    google()  // Google's Maven repository
  }
  dependencies {
    classpath 'com.google.gms:google-services:4.3.10'

  }
}
  allprojects {
  repositories {
    google()  // Google's Maven repository
  }
}
```

4. Execute the plugin by adding the following line of code to your /android/app/build.gradle file:

```gradle
apply plugin: 'com.google.gms.google-services'
```

## Configurations for IOS

1.  On the Firebase console, add a new IOS application and enter your projects details. Download `GoogleService-Info.plist`  file from firebase google console and move your file into the root of your Xcode project.

2. ### Enable Push Notifications

Next the "Push Notifications" capability needs to be added to the project. This can be done via the "Capability" option on the "Signing & Capabilities" tab:

 Click on the "+ Capabilities" button.<br />
 Search for "Push Notifications".

3. ### Enable Background Modes

Next the "Background Modes" capability needs to be enabled, along with both the "Background fetch" and "Remote notifications" sub-modes. This can be added via the "Capability" option on the "Signing & Capabilities" tab:

Click on the "+ Capabilities" button. <br />
Search for "Background Modes".

4. ### Configure Firebase with iOS credentials

To allow Firebase on iOS to use the credentials, the Firebase iOS SDK must be configured during the bootstrap phase of your application.

To do this, open your `/ios/{projectName}/AppDelegate.mm` file (or `AppDelegate.m`if on older react-native), and add the following:

At the top of the file, import the Firebase SDK right after `'#import "AppDelegate.h"'`:

```c
#import <Firebase.h>
```

Within your existing didFinishLaunchingWithOptions method, add the following to the top of the method:

```c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  // Add me --- \/
  if ([FIRApp defaultApp] == nil) { [FIRApp configure]; }
  // Add me --- /\
  // ...
}
```

### Podfile
 Add these two lines under ` config = use_native_modules!`

 ```powershell
  use_frameworks! :linkage => :static
  $RNFirebaseAsStaticFramework = true
 ```

 disable this line<br/> `# :flipper_configuration => flipper_config,`

Now add this line above `target 'RNFBTests' do`

```powershell
 $FirebaseSDKVersion = '10.4.0'
```

At last add all the below code at the bottom

```powershell
  installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings["GCC_WARN_INHIBIT_ALL_WARNINGS"] = "YES"
      end
    end

    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings["CC"] = "clang"
        config.build_settings["LD"] = "clang"
        config.build_settings["CXX"] = "clang++"
        config.build_settings["LDPLUSPLUS"] = "clang++"
      end
    end

    installer.aggregate_targets.each do |aggregate_target|
      aggregate_target.user_project.native_targets.each do |target|
        target.build_configurations.each do |config|
          config.build_settings['ONLY_ACTIVE_ARCH'] = 'YES'
          config.build_settings['EXCLUDED_ARCHS'] = 'i386'
        end
      end
      aggregate_target.user_project.save
    end
    installer.pods_project.targets.each do |target|
      if (target.name.eql?('FBReactNativeSpec'))
        target.build_phases.each do |build_phase|
          if (build_phase.respond_to?(:name) && build_phase.name.eql?('[CP-User] Generate Specs'))
            target.build_phases.move(build_phase, 0)
          end
        end
      end
    end

    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings["ENABLE_BITCODE"] = "NO"
      end
    end
  end
end
```

## Manual Setup
1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.
```javascript
import PushNotifications from "@modules/firebase-push-notifications";

const { title, navigator } = PushNotifications;
```
2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';

const PushNotifications = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<PushNotifications />;
```

## API Details

All the api calling methods reside in `api.js` file.

* **registerDeviceInfoAPI**
`registerDeviceInfoAPI` method takes an object containing `userID`,`authToken`, `registration_id`, `type`, `name`, `active`, `device_id`, `cloud_message_type` and adds device in the database.

* **fetchNotifications**
`fetchNotifications` method takes user's `authToken` and returns list of notifications against that user.

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1DI90lngd8ZnKauMngxZQZHaUDNY_2ZKS0IVT91K0XcE/edit?usp=sharing), which provides more information about the module's features.
