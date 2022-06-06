# Photo Editing


## Configuration for react-native-unimodules

1. Open up android/app/src/main/java/[...]/MainApplication.java. Add following lines to the imports at the top of the file.
```
    import com.demo.generated.BasePackageList;
    import java.util.Arrays;
    import org.unimodules.adapters.react.ModuleRegistryAdapter;
    import org.unimodules.adapters.react.ReactModuleRegistryProvider;

```
2. Add following lines of code in android/app/src/main/java/[...]/MainApplication.java as well.

```
    private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), null);
```

2. Add following lines of code in android/app/src/main/java/[...]/MainApplication.java as well.

Add below lines in getPackages function

```
    List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
            new ModuleRegistryAdapter(mModuleRegistryProvider)
          );
          packages.addAll(unimodules);
```

3. Append the following lines to android/settings.gradle.

```
    apply from: new File(["node", "--print", "require.resolve('react-native-unimodules/package.json')"].execute(null, rootDir).text.trim(), "../gradle.groovy"); includeUnimodulesProjects()
    apply from: new File(["node", "--print", "require.resolve('@react-native-community/cli-platform-android/package.json')"].execute(null, rootDir).text.trim(), "../native_modules.gradle"); applyNativeModulesSettingsGradle(settings)

```

4. Add following lines in android/app/build.gradle.

```
    apply from: '../../node_modules/react-native-unimodules/gradle.groovy'
```

5. Add this line in dependencies block in android/app/build.gradle.

```
    dependencies{
        addUnimodulesDependencies()
    }
```

### Configuration for @react-native-community_camerarol

1. Open up android/app/src/main/java/[...]/MainApplication.java. Append the given lines to imports.

```
    import com.reactnativecommunity.cameraroll.CameraRollPackage;

```
2. Append the following lines to android/settings.gradle.

```
    include ':@react-native-community_cameraroll'
    project(':@react-native-community_cameraroll').projectDir = new File(rootProject.projectDir, 	'../node_modules/@react-native-community/cameraroll/android')
```
3. Add android:requestLegacyExternalStorage="true" to AndroidManifest.xml.

```
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

```
```
    <application  android:requestLegacyExternalStorage="true" /> 
    </application>
```
## Features

This module contains the following list of features.
* Crop
* Filters
* Edits
* Shadows

### Crop
Image can be cropped by given Aspect ratios.
1. 1.1
2. 2.3
3. 3.2
4. 3.4
5. 4.3
6. 4.5

### Filters
List of filters that can be applied to the photo.
1. Warm
2. Classic
3. Vintage
4. Sharp
5. Negative
6. Bright
7. Cool

### Edits
List of effects to edit the image.
1. Contrast
2. Saturation.
3. Brightness
4. Temperature

### Shadows
Add Shadows to the image by adjusting 
1. Blur
2. Blur Passes
3. List of Maps

