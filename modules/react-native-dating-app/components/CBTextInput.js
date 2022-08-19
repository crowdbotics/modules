import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";


const CBTextInput = ({value, valueSetter, title, placeholder}) => {
    return (
      <View>
        <Text style={styles.subText}>{title}</Text>
          <TextInput
            style={styles.input}
            value={value}
            placeholder={placeholder}
            onChangeText={newText => valueSetter(newText)}
            defaultValue={value}
            maxLength={20}
          />
      </View>
    )
  }

  const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 15,
        borderColor: '#C4C4C4',
        backgroundColor: '#FFF'
      },
      buttonContainer: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 15
      },
      subText:{
        fontSize: 14,
        padding:10,
        fontWeight: '400',
        color: "black",
        textAlign: 'left'
      },
});

  export default CBTextInput;