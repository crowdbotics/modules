import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 8
    },
    shape: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    icon: {
        alignSelf: 'center'
    },
    text: {
        paddingTop: 8,
        textAlign: 'center',
    }
});
export default ({ onPress, source }) => <TouchableOpacity style={styles.container} onPress={onPress}>
  {source ? <Image source={{ uri: source }} style={styles.shape}/> : <LinearGradient colors={['#a5bef5', '#91a2c7']} start={{ x: 0.1, y: 0.2 }} style={styles.shape}>
    {/* <Ionicons name="camera" size={45} color="#fff" style={styles.icon}/> */}
  </LinearGradient>}
  <Text style={styles.text}>Set New Photo</Text>
</TouchableOpacity>;
