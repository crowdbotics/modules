# React Native scaffold

## Summary

- [template](template) is a copy of `react-native` 0.64.2 template directory. Please don't change it.
- [template.config.js](template.config.js) is a modified version of `react-native` 0.64.2 template config.
- [install.js](install.js) is a post installation / pre-deps script.

## Notes

Android:

- We no longer need MultiDex enabled.
  [scaffold/template/android/build.gradle](scaffold/template/android/build.gradle)

```
    ext {
        buildToolsVersion = "29.0.3"
        minSdkVersion = 21
        compileSdkVersion = 29
        targetSdkVersion = 29
        ndkVersion = "20.1.5948944"
    }
```

[Multidex support for Android 5.0 and higher](https://developer.android.com/studio/build/multidex#mdex-on-l)

> Android 5.0 (API level 21) and higher uses a runtime called ART which natively supports loading multiple DEX files from APK files. ART performs pre-compilation at app install time which scans for classesN.dex files and compiles them into a single .oat file for execution by the Android device. Therefore, if your minSdkVersion is 21 or higher multidex is enabled by default, and you do not need the multidex library.
