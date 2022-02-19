import React from "react"
import { StyleSheet, TextInput, View, Text } from 'react-native';

const Input = (props) => {
  return (
    <View style={{marginBottom: 10}}>
      {props.label && <Text style={{fontWeight: "bold"}}>{props.label}</Text>}
      <TextInput
        style={{...styles.input, color: '#000000'}}
        placeholder={props.label}
        editable={props.editable}
        value={props.value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 4,
    marginTop: 5,
    fontSize: 13
  }
});


export default Input