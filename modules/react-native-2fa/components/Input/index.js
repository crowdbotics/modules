import React, { useContext } from "react";
import { View, Text, TextInput } from "react-native";
import { OptionsContext } from "@options";

/**
 * Custom Input Component.
 * @param {Object} props - Component props.
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {string} props.value - Current value of the input field.
 * @param {Function} props.setValue - Function to update the value of the input field.
 * @param {string} props.errorText - Error message to display below the input field.
 * @returns {React.ReactNode} - The custom input component.
 */
const Input = ({ placeholder, value, setValue, errorText }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={(text) => setValue(text)}
        value={value}
        placeholderTextColor="#ddd"
      />
      {errorText ? <Text style={styles.inputError}>{errorText}</Text> : null}
    </View>
  );
};

export default Input;
