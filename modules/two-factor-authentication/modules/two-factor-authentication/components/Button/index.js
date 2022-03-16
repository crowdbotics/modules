import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Pressable } from "react-native";

const Button = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'purple',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  },
})
export default Button