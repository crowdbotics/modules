import React, { useContext } from "react";
import { View, Text, TextInput } from "react-native";
import { OptionsContext } from "@options";

/**
 * A custom input component for text entry.
 * @param {Object} props - The props object containing various properties for customization.
 * @param {Object} props.styles - Additional styles to be applied to the container view.
 * @param {string} props.placeholder - The placeholder text to display when the input is empty.
 * @param {string} props.value - The value of the input.
 * @param {function} props.setValue - The function to be called when the input value changes.
 * @param {string} props.errorText - The error message to display below the input (optional).
 * @param {boolean} props.multiline - Determines if the input can have multiple lines (default: false).
 * @param {boolean} props.editable - Determines if the input is editable (default: true).
 * @returns {JSX.Element} - The Input component.
 */
const Input = (props) => {
  const { styles } = useContext(OptionsContext);

  const { placeholder, value, setValue, multiline, editable, errorText } =
    props;
  return (
    <View style={[styles.textInputContainer, props.styles]}>
      <TextInput
        style={styles.inputStyles}
        placeholder={placeholder}
        value={value}
        onChangeText={(num) => setValue(num)}
        placeholderTextColor="#ddd"
        multiline={multiline}
        numberOfLines={multiline ? 10 : null}
        editable={editable !== false}
      />
      {errorText
        ? (
        <Text style={styles.textInputError}>{errorText}</Text>
          )
        : null}
    </View>
  );
};

export default Input;
