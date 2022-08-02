# Appointment
Appointment is a React Native based module. This module will enable new appointments to be created and synced with Google calendar. 

## Update webClientId and androidClientId.
Replace the webClientId, iosClientId and androidClientId keys In the options file.

```javascript

const androidClientId = "";
const webClientId = "";
const iosClientId = ""
```

### IOS 

Add the following schemes to your info.plist

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

## Features

# Sync with google calendar
Appointments are synced with Google Calendar.
# Create appointment
User can create an appointment

# Delete appointment
User can delete an appointment

# View list of appointments
user can view list of appointments

# Seach an appointment
User can search appointments



https://user-images.githubusercontent.com/76822297/176897194-9d6d20f9-9379-4f63-8d43-bb289321c176.mp4

