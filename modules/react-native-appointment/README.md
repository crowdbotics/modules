# Appointment Google React native specs

## Module description

Appointment is a React Native based module. This module will enable new appointments to be created and synced with Google calendar. 

- Appointments are synced with Google Calendar.
- Create an appointment.
- Delete an appointment.
- View list of appointments.
- Search appointments.
- List of the people who will show up/attend the meeting/event including the meeting/event organizer

![image](https://github.com/saad-abid-crowdbotics/modules/assets/76822297/14791585-3a64-4852-89f5-9a2ff22df4a3)

## ## Features

 - [x] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [x] This module requires manual iOS setup.

## ## 3rd party setup

A google cloud console is required to get iosClientId, androidClientId and web client id.

![cloud-console-keys](https://user-images.githubusercontent.com/76822297/228150010-a7b709f1-d805-400a-a8df-471424103242.png)

## Dependencies

Dependencies used:
   - react-native-calendar-strip  -  https://www.npmjs.com/package/react-native-calendar-strip
   - react-native-dropdown-picker  -  https://www.npmjs.com/package/react-native-dropdown-picker
   - @react-navigation/native-stack  -  https://www.npmjs.com/package/@react-navigation/native-stack
   - react-native-screens  -  https://www.npmjs.com/package/react-native-screens
   - react-native-calendars  - https://www.npmjs.com/package/react-native-calendars
   - moment  - https://www.npmjs.com/package/moment
   - react-native-pager-view  -  https://www.npmjs.com/package/react-native-pager-view
   - react-native-tab-view  -  https://www.npmjs.com/package/react-native-tab-view
   - @react-native-google-signin/google-signin  -  https://www.npmjs.com/package/@react-native-google-signin/google-signin

## ## Module Options

### Global Configs

No Global config required.

### Local Configs

Update these values from google cloud console.

```javascript
const androidClientId = "";
const webClientId = "";
const iosClientId = ""
```

### Android setup

1. Update `android/build.gradle` with

```powershell
buildscript {
    ext {
        buildToolsVersion = "27.0.3"
        minSdkVersion = 16
        compileSdkVersion = 27
        targetSdkVersion = 26
        supportLibVersion = "27.1.1"
        googlePlayServicesAuthVersion = "19.2.0" // <--- use this version or newer
    }
...
    dependencies {
        classpath 'com.android.tools.build:gradle:4.2.1' // <--- use this version or newer
        classpath 'com.google.gms:google-services:4.3.10' // <--- use this version or newer
    }
...
allprojects {
    repositories {
        mavenLocal()
        google() // <--- make sure this is included
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```
2. Update `android/app/build.gradle` with

```
...
dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "com.facebook.react:react-native:+"
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.0.0' // <-- add this; newer versions should work too
}

apply plugin: 'com.google.gms.google-services' // <--- this should be the last line
```

### iOS setup

Add the following schemes to your `info.plist`

```
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>***Your bundle ID***<</string>
        </array>
    </dict>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>***Your iosClientId ID***</string>
        </array>
    </dict>
</array>
```
