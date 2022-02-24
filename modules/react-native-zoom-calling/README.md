# Zoom Calling

### Installation command
`yarn add react-native-zoom-us`

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
2. In your MainApplication.java inside of onCreate add 
SoLoader.loadLibrary("zoom");
```
@Override
public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    SoLoader.loadLibrary("zoom"); // <-- ADD THIS LINE
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
}
```
3. Add this to /android/app/src/main/res/xml/network_security_config.xml
```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">ocsp.digicert.com</domain>
        <domain includeSubdomains="true">crl3.digicert.com</domain>
        <domain includeSubdomains="true">crl4.digicert.com</domain>
        <domain includeSubdomains="true">crl.godaddy.com</domain>
        <domain includeSubdomains="true">certificates.godaddy.com</domain>
        <domain includeSubdomains="true">crl.starfieldtech.com</domain>
        <domain includeSubdomains="true">certificates.starfieldtech.com</domain>
        <domain includeSubdomains="true">ocsp.godaddy.com</domain>
        <domain includeSubdomains="true">ocsp.starfieldtech.com</domain>
    </domain-config>
</network-security-config>
```
4. Then add this to /android/app/src/main/AndroidManifest.xml
```
<application
  ...
  android:networkSecurityConfig="@xml/network_security_config"
>
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
