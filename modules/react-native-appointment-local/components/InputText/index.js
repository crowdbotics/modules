import React, { useContext } from "react";
import { View, Text, TextInput } from "react-native";
import { OptionsContext } from "@options";

/**
 * Custom Text Input component
 * @param  {String} placeholder Placeholder for the text input
 * @param  {String} value Current and default value of the text input
 * @param  {Function} setValue Function to update the value of text input
 * @param  {Boolean} multiline This shows if user can write text in multiline or not
 * @param  {Boolean} editable This shows if user can write in the input or not
 * @param  {String} errorText The error message to be displayed below the input.
 * @return {React.ReactNode}
 */
const Input = (props) => {
  const options = useContext(OptionsContext);
  const { styles } = options;
  const {
    placeholder,
    value,
    setValue,
    multiline,
    editable,
    errorText
  } = props;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={val => setValue(val)}
        placeholderTextColor='#ddd'
        multiline={multiline}
        numberOfLines={multiline ? 10 : null}
        editable={editable !== false}
      />
      {errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

export default Input;
