import React, { createRef, useState } from "react";
import { View, TouchableOpacity, Text, PermissionsAndroid, Platform, Alert } from "react-native";
// @ts-ignore
import CameraRoll from "@react-native-community/cameraroll";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// @ts-ignore
import { FilterCameraView } from "react-native-filter-camera";
import * as script from "./utils";
import { styles } from "./options";
import Filter from "./components/Filter";
import Loader from "./components/Loader";

export const App = () => {
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

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

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
    <View style={styles.cameraContainer}>
      <FilterCameraView ref={cameraRef} onPictureTaken={onPictureTaken} style={styles.cameraContainer} />
      <View style={styles.filterContainer}>
        {isLoading && <Loader />}
        <View style={styles.cameraUIView}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={switchCameraDirection}
          >
            <Text style={{ color: "white" }}>{switchCamera ? <Icon name="camera-rear-variant" size={25} color="#fff" /> : <Icon name="camera-front-variant" size={25} color="#fff" />}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleTakePicture}
          >
            <Text style={{ color: "white" }}><Icon name="camera-iris" size={50} color="#fff" /></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
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
