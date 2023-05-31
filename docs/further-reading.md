# Further Reading

Reading lists, links to Android/iOS documentation, etc.

## iOS

### App's Capabilities (Entitlements)

> Key-value pairs that grant an executable permission to use a service or technology.

Documentation - https://developer.apple.com/documentation/bundleresources/entitlements

**Examples**

iOS Push Notifications - `aps-environment`

```xml-property-list
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>aps-environment</key>
  <string>development</string>
</dict>
</plist>
```
