# Zoom Free Calling

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

### iOS
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


### known issues

* Undefined symbol: _OBJC_CLASS_$_MobileRTCMeetingJoinParam
* Undefined symbol: _OBJC_CLASS_$_MobileRTCMeetingStartParam4WithoutLoginUser
* Undefined symbol: __swift_FORCE_LOAD_$_swiftCoreFoundation

------------------------------------------------------

* Library not found for -lDoubleConversion

```
add "arm64" in Pods >> Build Settings >> Excluded Architectures
```

### Configurations Keys
```
CLIENT_ID = "...”
SDK_KEY = "..."
SDK_SECRET = "..."
CLIENT_SECRET = "..."
REDIRECT_URI = "https://www.crowdbotics.com"
```
### Generate Access Token

## Request User Authorization
Direct the user to https://zoom.us/oauth/authorize with the following query parameters:
* response_type
* redirect_uri
* client_id
* code_challenge
* code_challenge_method

## Request Access Token
Make a POST request to https://zoom.us/oauth/token with the following Request Headers
and Request Body information:
* code
* grant_type
* redirect_uri
* code_verifier

### Meetings

## Initialize zoom sdk
```
await ZoomUs.initialize({
    clientKey: '...',
    clientSecret: '...',
})
```
## Join a meeting
```
await ZoomUs.joinMeeting({
    userName: 'Johny',
    meetingNumber: '12345678',
})
```
## Host a meeting
```
await ZoomUs.startMeeting({
    userName: 'Johny',
    meetingNumber: '12345678',
    userId: 'our-identifier',
    zoomAccessToken: zak,
    userType: 2, // optional
})
```
## Create a meeting
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
## List schedule meetings
This API only supports scheduled meetings. This API does not return information
about instant meetings.
[https://api.zoom.us/v2/users/{userId}/meetings]
## Delete a meeting
[https://api.zoom.us/v2/meetings/{meetingId}]
## Perform batch registration (Not implemented)
Prerequisites: The meeting host must be a Licensed user.
Rate Limit Label: Heavy



https://user-images.githubusercontent.com/76822297/176625854-0b51816d-d89d-4edc-8677-4c8572ff13b0.mp4


