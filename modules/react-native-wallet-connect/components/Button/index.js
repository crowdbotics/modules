import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableHighlight } from "react-native";

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} disabled={props.disabled} underlayColor='#DDDDDD'>
      <View style={!props.clicked ? styles.button : styles.clicked}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    height:49,
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  clicked: {
    padding: 10,
    backgroundColor: '#2E5984',
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