# FCM Module
Using FCM module, you can notify a client app that new email or other data is available to sync. You can send notification messages to drive user re-engagement.

## Features
User is able to receive notifications from Firebase.
User is able to increase Message Visibility
User is able to view the list of received notifications  
User is able to push alerts to remind users


## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` and `x-dependencies` section and past them in your project's main `package.json` file.
Here are the required packages for the module:
```
  "@react-native-community/push-notification-ios": "^1.10.1",
	"react-native-push-notification": "^8.1.1",
	"react-native-device-info": "^8.1.3"
```
and run this command.
  ```
  yarn install
  ```

## Configurations for Android
1. On the Firebase console, add a new Android application and enter your projects details. The "Android package name" must match your local projects package name which can be found inside of the manifest tag within the /android/app/src/main/AndroidManifest.xml file within your project.


2. Download the google-services.json file and place it inside of your project at the following location: /android/app/google-services.json.


3. Add the google-services plugin inside of your /android/build.gradle file:
```
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

4. Execute the plugin by adding the following lines of code to your /android/app/build.gradle file:

```
apply plugin: 'com.google.gms.google-services'
dependencies {
  implementation platform('com.google.firebase:firebase-bom:30.1.0')
  implementation 'com.google.firebase:firebase-analytics'
  implementation project(':react-native-push-notification')
}
```

5. In android/settings.gradle add following lines:

```
include ':react-native-push-notification'
project(':react-native-push-notification').projectDir = file('../node_modules/react-native-push-notification/android')
```

6. Add in /android/app/src/main/AndroidManifest.xml file within your project.

```
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>

<application ...>

 <meta-data  android:name="com.dieam.reactnativepushnotification.notification_foreground"
                    android:value="false"/>
        <!-- Change the resource name to your App's accent color - or any other color you want -->
        <meta-data  android:name="com.dieam.reactnativepushnotification.notification_color"
                    android:resource="@color/white"/> <!-- or @android:color/{name} to use a standard color -->

        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationActions" />
        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationPublisher" />
        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationBootEventReceiver">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.QUICKBOOT_POWERON" />
                <action android:name="com.htc.intent.action.QUICKBOOT_POWERON"/>
            </intent-filter>
        </receiver>

        <service
            android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
            android:exported="false" >
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
        ...
</application>
```

7. Add following in android/app/src/main/res/values/colors.xml (Create the file if it doesn't exist).

```
<resources>
    <color name="white">#FFF</color>
</resources>
```


## Configurations for IOS

1.  On the Firebase console, add a new IOS application and enter your projects details. Download `GoogleService-Info.plist`  file from firebase google console and move your file into the root of your Xcode project.

2. Update AppDelegate.h. At the top of the file:

```
#import <UserNotifications/UNUserNotificationCenter.h>
```
Then, add the 'UNUserNotificationCenterDelegate' to protocols:
### For Old scaffold `0.64`
```
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
```

### For New scaffold `0.71.7`
```c
@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>
```

3. Update AppDelegate.m, At the top of the file:

```
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
```
Then, add the following lines:

```
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}
```

4. And then in your AppDelegate implementation, add the following:

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  return YES;
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}
```


5. In ios/Podfile, At the top add:

```
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '12.4'
install! 'cocoapods', :disable_input_output_paths => true
install! 'cocoapods', :deterministic_uuids => false


target 'demo' do
  config = use_native_modules!

  use_react_native!(
    :path => config[:reactNativePath],
    # to enable hermes on iOS, change `false` to `true` and then install pods
    :hermes_enabled => false
  )

  use_frameworks! :linkage => :static

  pod 'Firebase/Core'
  pod 'Firebase/Messaging'

  target 'demoTests' do
    inherit! :complete
    # Pods for testing
  end

  # Enables Flipper.
  #
  # Note that if you have use_frameworks! enabled, Flipper will not work and
  # you should disable the next line.
  # use_flipper!()

  post_install do |installer|
    react_native_post_install(installer)
    installer.pods_project.targets.each do |target|
     
      if (target.name&.eql?('FBReactNativeSpec'))
        target.build_phases.each do |build_phase|
          if (build_phase.respond_to?(:name) && build_phase.name.eql?('[CP-User] Generate Specs'))
            target.build_phases.move(build_phase, 0)
          end
        end
      end
    end
  end
end
  
```


## Global Configs

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this: 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

## Local Configs
in modules/fcm/options.js update the senderId and authToken

```
const authToken = "Your Authorization token";
const senderID = "FCM Sender ID ";
const userID = 1;
```
## API Calling Methods
All the api calling methods reside in `api.js` file.

* **registerDeviceInfoAPI**
`registerDeviceInfoAPI` method takes an object containing `userID`,`authToken`, `registration_id`, `type`, `name`, `active`, `device_id`, `cloud_message_type` and adds device in the database.

* **fetchNotifications**
`fetchNotifications` method takes user's `authToken` and returns list of notifications against that user.


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
## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1DI90lngd8ZnKauMngxZQZHaUDNY_2ZKS0IVT91K0XcE/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)