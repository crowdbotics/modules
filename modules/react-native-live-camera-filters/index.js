import React, { createRef, useState, useContext } from "react";
import { View, TouchableOpacity, Text, PermissionsAndroid, Platform, Alert } from "react-native";

import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { FilterCameraView } from "react-native-filter-camera";
import * as script from "./utils";
import { OptionsContext } from "@options";
import Filter from "./components/Filter";
import Loader from "./components/Loader";

export const App = () => {
  const options = useContext(OptionsContext);
  const [switchFlash, setSwitchFlash] = useState(false);
  const [switchCamera, setSwitchCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = createRef();

  const selectFilter = (settings) => {
    script.setFilter(cameraRef, [settings]);
  };

  const switchCameraDirection = () => {
    script.switchCameraDirection(cameraRef);
    setSwitchCamera(!switchCamera);
  };

  const switchFlashLight = () => {
    script.switchFlash(cameraRef);
    setSwitchFlash(!switchFlash);
  };

  const handleTakePicture = () => {
    setIsLoading(true);
    const fileName = "id_" + new Date().getTime();
    script.takePicture(cameraRef, [fileName]);
  };

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO)
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission
        );
      } else {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  const onPictureTaken = async (pic) => {
    const picUri = pic?.nativeEvent?.uri;
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    await CameraRoll.save(picUri, { type: "photo" });
    setIsLoading(false);
    Alert.alert(
      "Info",
      "Photo saved in Gallery.",
      [
        {
          text: "Ok"
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={options.styles.cameraContainer}>
      <FilterCameraView ref={cameraRef} onPictureTaken={onPictureTaken} style={options.styles.cameraContainer} />
      <View style={options.styles.filterContainer}>
        {isLoading && <Loader />}
        <View style={options.styles.cameraUIView}>
          <TouchableOpacity
            style={options.styles.menuButton}
            onPress={switchCameraDirection}
          >
            <Text style={{ color: "white" }}>{switchCamera ? <Icon name="camera-rear-variant" size={25} color="#fff" /> : <Icon name="camera-front-variant" size={25} color="#fff" />}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={options.styles.menuButton}
            onPress={handleTakePicture}
          >
            <Text style={{ color: "white" }}><Icon name="camera-iris" size={50} color="#fff" /></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={options.styles.menuButton}
            onPress={switchFlashLight}
          >
            <Text style={{ color: "white" }}>{switchFlash ? <Icon name="flash" size={25} color="#fff" /> : <Icon name="flash-off" size={25} color="#fff" />}</Text>
          </TouchableOpacity>
        </View>
        <Filter selectFilter={selectFilter} />
      </View>
    </View>
  );
};

export default {
  title: "Live Camera Filters",
  navigator: App
};
