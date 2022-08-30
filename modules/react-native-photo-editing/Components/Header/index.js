import React, { Fragment, useState } from "react";
import CameraRoll from "@react-native-community/cameraroll";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { hasAndroidPermission } from "../../Utils/common";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Loader from "../Loader";

const Header = () => {
  const navigation = useNavigation();
  const state = useSelector(state => state.uri);
  const [isLoading, setIsLoading] = useState(false);

  const savePicture = async () => {
    setIsLoading(true);
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    await CameraRoll.save(state.uri, { type: "photo" });
    setIsLoading(false);
    Alert.alert(
      "info",
      "Photo saved in Gallery.",
      [
        {
          text: "Ok",
          onPress: cancelEditing
        }
      ],
      { cancelable: false }
    );
  };

  const cancelEditing = () => {
    navigation.navigate("imagePicker");
  };

  return (
        <Fragment>
            {isLoading && <Loader />}
            <View style={styles.topSection}>
                <Text style={styles.headingText}>Image editing</Text>
                <View style={styles.saveContainer}>
                    <Text style={styles.headingText} onPress={savePicture}>Save</Text>
                    <Text style={styles.cancelBtn} onPress={cancelEditing}>X</Text>
                </View>
            </View>
        </Fragment>
  );
};

const styles = StyleSheet.create({
  headingText: { fontSize: 14, fontWeight: "bold", lineHeight: 16.41, color: "#1E2022" },
  imgContainer: { display: "flex", alignSelf: "center", maxHeight: 400 },
  topSection: { marginVertical: 20, marginHorizontal: 28, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cancelBtn: { fontSize: 14, fontWeight: "bold", marginLeft: 20, backgroundColor: "#000", color: "#fff", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 15 },
  saveContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" }
});

export default Header;
