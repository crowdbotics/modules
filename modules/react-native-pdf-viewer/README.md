# PDF Viewer React native specs

## Module description

PDF Viewer is a React Native module to display or preview PDFs for both Android and iOS.

- View pdf and scroll pages

![image](https://github.com/saad-abid-crowdbotics/modules/assets/76822297/8bfe2a15-0c26-4abf-92d0-ee987f60afc7)


## ## Features

 - [ ] This module includes environment variables.
 - [ ] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account creation required.

## Dependencies

Dependencies used:
- [prop-types](https://www.npmjs.com/package/prop-types)
- [react-native-view-pdf](https://www.npmjs.com/package/react-native-view-pdf)

## ## Module Options

### Global Configs

No global configs required.

### Local Configs

in modules/pdfviewer/options.js provide the source for the pdf file.
Use any of the below way to provide the source for pdf file:

```javascript
export const resources = {
  //A resource to render. It's possible to render PDF from file, url or base64
  url: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
  base64: "JVBERi0xLjMKJcfs..."
};
export const resourceType = "url"; // Should correspond to resource and can be: file, url or base64.
export const fadeInDuration = 250.0; //Fade in duration (in ms, defaults to 0.0) to smoothly fade the webview into view when pdf loading is completed
```

### Android setup

1. If you use RN 0.59.0 and above, please add following to your `android/app/build.gradle`:

```java

android {

    packagingOptions {
       pickFirst 'lib/x86/libc++_shared.so'
       pickFirst 'lib/x86_64/libjsc.so'
       pickFirst 'lib/arm64-v8a/libjsc.so'
       pickFirst 'lib/arm64-v8a/libc++_shared.so'
       pickFirst 'lib/x86_64/libc++_shared.so'
       pickFirst 'lib/armeabi-v7a/libc++_shared.so'
     }

   }
```

### iOS setup

1. Run `pod install` in the ios directory. Linking is not required in React Native 0.60 and above.
