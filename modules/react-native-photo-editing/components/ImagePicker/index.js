import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
// @ts-ignore

const ImagePicker = ({ handImagePicker }) => {
  const pickImage = () => {
    handImagePicker();
  };

  return (

    <TouchableOpacity style={styles.pickerContainer} onPress={pickImage}>
      <Text style={styles.text}>Select Photo</Text>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    height: 50,
    width: 200,
    backgroundColor: "#FCF1D6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  text: { fontSize: 20, fontWeight: "bold", color: "#FFF", textAlign: "center" }
});

export default ImagePicker;
