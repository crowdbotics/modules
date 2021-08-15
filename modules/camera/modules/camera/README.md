## Android Configs

Add these to `android/app/src/main/AndroidMenifest.xml`

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

## iOS Configs

add following to `ios/Podfile`

    permissions_path = '../node_modules/react-native-permissions/ios'
    pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
    pod 'Permission-PhotoLibrary', :path => "#{permissions_path}/PhotoLibrary"

add following to `Info.plist` file

    <key>NSCameraUsageDescription</key>
    <string>Your message to user when the camera is accessed for the first time</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>Your message to user when the microphone is accessed for the first time</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Your message to user when the gallery is accessed for the first time</string>


then run 

    cd ios
    pod install

