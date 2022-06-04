import { Text, View, StyleSheet } from "react-native";
import React from "react";
import Button from "../Button";

const ImagePicker = ({ handImagePicker }) => {
  const pickImage = () => {
    handImagePicker();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Choose Photo from Gallery</Text>
        <Button onPress={pickImage}>
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
