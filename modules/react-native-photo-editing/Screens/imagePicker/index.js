import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../Components/Button";

import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { setImageUri } from "../../Store";
import { reSizeImage } from "../../Utils/common";
import { useNavigation } from "@react-navigation/native";

const ImagePicker = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handImagePicker = () => {
    launchImageLibrary({ mediaType: "photo" }).then((res) => {
      if (res?.didCancel) {
        return;
      }
      reSizeImage(res.assets[0].uri, res.assets[0].width, res.assets[0].height).then(response => {
        reSizeImage(response.uri, response.width, response.height).then(response => {
          dispatch(setImageUri(response));
          navigation.replace("crop");
        }).catch(error => {
          console.log("error", error);
        });
      }).catch(error => {
        console.log("error", error);
      });
    }).catch((error) => {
      console.log("error", error);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Choose Photo from Gallery</Text>
        <Button onPress={handImagePicker}>
          Choose Photo
        </Button>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  text: { fontSize: 20, fontWeight: "bold", marginVertical: 20 }
});

export default ImagePicker;
