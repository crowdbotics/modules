
  <uses-permission android:name="android.permission.CAMERA" />
 <uses-permission android:name="android.permission.RECORD_AUDIO"/>
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />



then you have to add line missingDimensionStrategy 'react-native-camera', 'general' in your android/app/build.gradle file under defaultConfig.

  npm install react-native-actionsheet@2.4.2
  npm install react-native-image-crop-picker@0.36.2
  npm install react-native-permissions@3.0.4