## iOS


-PodFile

platform :ios, '13.0'

require "active_support/core_ext/object"

with_options modular_headers: true do
  pod 'GoogleUtilities'
  pod 'FirebaseCore'
end

# React Native Maps dependencies
rn_maps_path = '../node_modules/react-native-maps'
pod 'react-native-google-maps', :path => rn_maps_path


permissions_path = '../node_modules/react-native-permissions/ios'
pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
pod 'Permission-PhotoLibrary', :path => "#{permissions_path}/PhotoLibrary"


AppDelegate.m
+ #import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

<!-- line 30 first line in function didFinishLaunchingWithOptions -->
[GMSServices provideAPIKey:@"_YOUR_API_KEY_"]; // add this line using the api key obtained from Google Console


Info.plist
<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>
<key>NSMicrophoneUsageDescription</key>
<string>Your message to user when the microphone is accessed for the first time</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Your message to user when the gallery is accessed for the first time</string>


open your project again on XCode, find the root folder of the XCode project, click on the right button of your mouse and select to create a `New File`. Choose it to be a `Swift` file and click create, as shown in the images below:

![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/19926/da0aa8c8-1779-46d9-8a2e-5e5665d6d15d.png)

XCode will ask about Bridging Header, Create the header

in build settings 
search paths remve swift lines


# Android

AndroidManifest.xml
<application>
...
<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="GOOGLE_API_KEY"/>
...
</application>
