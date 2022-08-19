import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

// create button component
const ProfileIcon = ({ onPress, image_src, styleContainer={}, styleLiveStatus={}, styleImage={}, color="red"}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.profileContainer, styleContainer]}>
        <Image source={{uri: image_src }} style={[styles.profileImage, styleImage]}/>
        <View style={[styles.liveStatus, styles.red, {backgroundColor: color}, styleLiveStatus]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    profileContainer: {
        width: 65,
        height: 65,
        backgroundColor: '#7f8c8d',
        borderRadius: 40,
    },
    red: {
        backgroundColor: 'red',
    },
    green: {
        backgroundColor: 'green',
    },
    blue: {
        backgroundColor: 'blue',
    },
    yellow: {
        backgroundColor: 'yellow',
    },
    liveStatus: {
        width: 15,
        height: 15,
        borderRadius: 180 / 2,
       
        marginTop:40,
        right:-15,
        marginRight:10,
        position:'absolute',
        zIndex: 1
    },
    profileImage: {
        width: 65,
        height: 65,
        borderRadius: 40,
    }
});

export default ProfileIcon;