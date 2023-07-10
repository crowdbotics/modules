# Zoom Free Calling
The module that will be used by users for managing, creating, and attending zoom meetings.

### Use following versions of `react-native-zoom-us` for New and Old scaffolds:
```
Use `react-native-zoom-us`
`v6.6.1` for Old scaffold `0.64`
```

```
Use `react-native-zoom-us`
`v6.16.5` for New scaffold `0.71.7`
```


## Scope Features
The following are the critical features in scope for this module.
1. User will be able to Create Meeting
2. User will be able to Host Meeting
3. User will be able to Join Meeting
4. User will be able to get List Schedule Meeting
5. User will be able to Delete the Meeting

## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` and `x-dependencies` section and past them in your project's main `package.json` file.
Here are the required packages for the module:
```
"react-native-base64": "0.2.1",
"react-native-dialog-input": "1.0.8",
"react-native-paper": "4.11.2",
"react-native-dropdown-picker": "5.3.0"
"react-native-vector-icons": "8.1.0",
"react-native-webview": "^11.17.2",
"react-native-zoom-us": "6.6.1",
"react-native-sha256": "1.4.7",
"react-native-date-picker": "4.1.5",
"@react-native-cookies/cookies": "6.0.11",
"@react-native-community/checkbox": "0.5.10"
```
and run this command.
  ```
  yarn install
  ```

## Keys And Credientials Setup
The follow are th steps for credientials setup:
1. Login in to [Zoom Marketplace](https://marketplace.zoom.us/).
2. Under `Develop` dropdown click `Build app` option.
3. Select `Meeting SDK` on `Choose your app type` page.
4. Enter the name of your app click `Create` button.
5. Enter all the details required for the sdk.
6. Once your details are submitted and verified click `App Credentials` tab.
7. Copy `SDK Key`, `SDK Secret`, `Client ID` and `Client Secret` and save them for later use.
![zoom calling (1)](https://user-images.githubusercontent.com/120275623/228444016-9f265712-5c89-4115-bace-97b239fb11df.png)

## Configurations Keys
```
CLIENT_ID = "...”
SDK_KEY = "..."
SDK_SECRET = "..."
CLIENT_SECRET = "..."
REDIRECT_URI = "https://www.crowdbotics.com"
```
## Generate Access Token

### Request User Authorization
Direct the user to https://zoom.us/oauth/authorize with the following query parameters:
* response_type
* redirect_uri
* client_id
* code_challenge
* code_challenge_method

### Request Access Token
Make a POST request to https://zoom.us/oauth/token with the following Request Headers
and Request Body information:
* code
* grant_type
* redirect_uri
* code_verifier

## Meetings

### Initialize zoom sdk
```
await ZoomUs.initialize({
    clientKey: '...',
    clientSecret: '...',
})
```
### Join a meeting
```
await ZoomUs.joinMeeting({
    userName: 'Johny',
    meetingNumber: '12345678',
})
```
### Host a meeting
```
await ZoomUs.startMeeting({
    userName: 'Johny',
    meetingNumber: '12345678',
    userId: 'our-identifier',
    zoomAccessToken: zak,
    userType: 2, // optional
})
```
### Create a meeting
This API has a daily rate limit of 100 requests per day. The rate limit is applied 
against the userId of the meeting host used to make the request.
[https://api.zoom.us/v2/users/{userId}/meetings]
payload
```
{
    recurrence: {
        end_date_time: '',
        end_times: 1,
        monthly_day: 1,
        monthly_week: -1,
        monthly_week_day: 1,
        repeat_interval: 0,
        type: 1,
        weekly_days: '1'
    },
    settings: {
        host_video: true,
        participant_video:true
        use_pmi: 1234567890
    },
    start_time:  “2022-02-24 11:20:00”
    timezone: “”,
    topic: “”,
    type: 2
}
```
## Android Setup
1. Set pickFirst rules in android/app/build.gradle
```
android {
    packagingOptions {
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
    }
}
```
2. In MainApplication.java inside of onCreate method add:
```
@Override
public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    SoLoader.loadLibrary("zoom"); // <-- ADD THIS LINE
    return packages;
}
```

### Extra steps for new scaffold 0.71.7

1. Add these in `AndroidManifest.xml`
```xml
// In application tag
tools:replace="android:usesCleartextTraffic"
android:usesCleartextTraffic="true"

//In Manifest tag
 xmlns:tools="http://schemas.android.com/tools"
```

If your app does not connect to `Metro Server`

Step 1 : create a file in android folder `app/src/debug/res/xml/network_security_config.xml`

Step 2 : add this to `network_security_config.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <!-- deny cleartext traffic for React Native packager ips in release -->
  <domain-config cleartextTrafficPermitted="true">
   <domain includeSubdomains="true">localhost</domain>
   <domain includeSubdomains="true">10.0.2.2</domain>
   <domain includeSubdomains="true">10.0.3.2</domain>
  </domain-config>
</network-security-config>
```

Step 3 : Apply the config to your AndroidManifest.xml in debug folder

```xml
<application
 android:networkSecurityConfig="@xml/network_security_config">
</application>
```

## iOS Setup
1. Make sure you have appropriate description in Info.plist:
```
<key>NSBluetoothPeripheralUsageDescription</key>
<string>We will use your Bluetooth to access your Bluetooth headphones.</string>
	
<key>NSCameraUsageDescription</key>
<string>For people to see you during meetings, we need access to your camera.</string>
	
<key>NSMicrophoneUsageDescription</key>
<string>For people to hear you during meetings, we need access to your microphone.</string>
	
<key>NSPhotoLibraryUsageDescription</key>
<string>For people to share, we need access to your photos.</string>
```
2. Update pods using cd ios/ && pod install && cd ..
3. Make sure to set ENABLE_BITCODE = NO; for both Debug and Release because bitcode is not supported by Zoom iOS SDK
4. Optional: Implement custom UI See [docs](https://marketplace.zoom.us/docs/sdk/native-sdks/iOS/mastering-zoom-sdk/in-meeting-function/customized-in-meeting-ui/overview/) for more details.


## known issues

* Undefined symbol: _OBJC_CLASS_$_MobileRTCMeetingJoinParam
* Undefined symbol: _OBJC_CLASS_$_MobileRTCMeetingStartParam4WithoutLoginUser
* Undefined symbol: __swift_FORCE_LOAD_$_swiftCoreFoundation

------------------------------------------------------

* Library not found for -lDoubleConversion

```
add "arm64" in Pods >> Build Settings >> Excluded Architectures
```

### List schedule meetings
This API only supports scheduled meetings. This API does not return information
about instant meetings.
[https://api.zoom.us/v2/users/{userId}/meetings]
### Delete a meeting
[https://api.zoom.us/v2/meetings/{meetingId}]
### Perform batch registration (Not implemented)
Prerequisites: The meeting host must be a Licensed user.
Rate Limit Label: Heavy


## Module Preview Module
https://user-images.githubusercontent.com/76822297/176625854-0b51816d-d89d-4edc-8677-4c8572ff13b0.mp4

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1aIvbzlOWRYcdcQGOnWwT7Ejg0AZRmudp5VOBFtJajew/edit?usp=sharing), which provides more information about the module's actual intentions.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
