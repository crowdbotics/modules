# Live camera filters module

By using Live camera filters module, user will be able to apply filters in real time on the photos while taking a picture.

## Manual Setup

1. Open up android/app/src/main/java/[...]/MainApplication.java. Add following line to the imports at the top of the file.

```
    import com.reactnativefiltercamera.FilterCameraPackage;
``` 
2. Add following line of code in android/app/src/main/java/[...]/MainApplication.java as well.

Add below line in getPackages function

```
    packages.add(new FilterCameraPackage());
```
3. Add the following lines of code in android/app/src/main/AndroidManifest.xml to get the permissions.

```
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.INTERNET" />
```
## Features
The following are the key features in scope for this module.

1. Ability to take picture from camera.
2. Ability to apply filters on photo while taking picture. Here is list of available filters:
   * Negative
   * Sharp
   * Vintage
   * Flare
   * Iris
   * Amaro
   * Lomo
   * Sepia
3. Ability to switch camera direction.
4. Ability to to switch flash on/off.
5. Ability to save the picture.
