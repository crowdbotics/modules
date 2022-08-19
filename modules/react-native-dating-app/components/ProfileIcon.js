import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { OptionsContext } from "@options";

// create button component
const ProfileIcon = ({ onPress, imageSrc, styleContainer = {}, styleLiveStatus = {}, styleImage = {}, color = "red" }) => {
  // Consume module's own options in this component
  const options = useContext(OptionsContext);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.profileContainer, { backgroundColor: options.colors.secondary }, styleContainer]}>
        <Image source={{ uri: imageSrc }} style={[styles.profileImage, styleImage]}/>
        <View style={[styles.liveStatus, styles.red, { backgroundColor: color }, styleLiveStatus]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: 65,
    height: 65,
    backgroundColor: "#7f8c8d",
    borderRadius: 40
  },
  red: {
    backgroundColor: "red"
  },
  green: {
    backgroundColor: "green"
  },
  blue: {
    backgroundColor: "blue"
  },
  yellow: {
    backgroundColor: "yellow"
  },
  liveStatus: {
    width: 15,
    height: 15,
    borderRadius: 180 / 2,

    marginTop: 40,
    right: -15,
    marginRight: 10,
    position: "absolute",
    zIndex: 1
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 40
  }
});

export default ProfileIcon;
