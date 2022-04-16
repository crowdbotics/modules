import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'

const Input = (props) => {

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num)=>props.setValue(num)}
        placeholderTextColor='#ddd'
        editable={props.editable === false? false : true}
      />
      {props.errorText ? <Text style={styles.error}>{props.errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius:10,
    paddingLeft:10,
    paddingRight:10,
  },
  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: '#C4C4C4',
    color: "#000",
    borderRadius: 10,
    fontSize: 14
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8,
  },
})
export default Input;