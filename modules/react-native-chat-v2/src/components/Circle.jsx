import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const styles = StyleSheet.create({
    container: {
        paddingRight: 8
    },
    shape: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    text: {
        paddingTop: 5,
        paddingRight: 2,
        fontSize: 36,
        color: 'white',
        textAlign: 'center'
    }
});
export default ({ letter, source }) => <View style={styles.container}>
  {source ?
    <Image source={{ uri: source }} style={styles.shape}/> :
    <LinearGradient colors={['#a5bef5', '#91a2c7']} start={{ x: 0.1, y: 0.2 }} style={styles.shape}>
      <Text style={styles.text}>{letter}</Text>
    </LinearGradient>}
</View>;
