import React, { useContext } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { OptionsContext } from "@options";

/**
 * Custom Text Input Component
 * @param {Object} props - The input component props
 * @param {Object} props.containerStyle - Styles for the main input container
 * @param {String} props.text - Label for the input
 * @param {Object} props.style - Extra styles for the Text Input
 * @param {Boolean} props.textArea - Defines if the input area should be used for multiline input
 * @param {String} props.placeholder - Placeholder text for the input
 * @param {String} props.value - Default and current value of the input
 * @param {Function} props.onChange - Function to update input's state when its value changes
 * @param {String} props.placeholderTextColor - Color of the placeholder text
 * @param {Boolean} props.editable - Indicates whether the input's value can be changed or not
 * @param {String} props.errorText - Error message to be displayed
 * @param {String} props.icon - Source link for the icon to be displayed with the input
 * @param {React.ReactNode} props.children - Components to render beside the input
 * @returns {React.ReactNode} - The input component
 */
const Input = (props) => {
  const {
    containerStyle,
    text,
    style,
    textArea,
    placeholder,
    value,
    onChange,
    placeholderTextColor,
    editable,
    errorText,
    icon,
    children
  } = props;

  // Accessing the styles from the OptionsContext
  const options = useContext(OptionsContext);
  const { styles } = options;

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {/* Render the label if provided */}
      {text ? <Text style={styles.inputText}>{text}</Text> : null}

      {/* The main TextInput component */}
      <TextInput
        style={[styles.input, style, textArea ? styles.textArea : null]}
        placeholder={placeholder || "Enter"}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={placeholderTextColor || "#9B9B9B"}
        editable={editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!textArea}
      />

      {/* Display the error message if provided */}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

      {/* Display an icon if provided */}
      {icon
        ? (
        <Image
          source={icon}
          style={text ? styles.iconWithText : styles.iconWithoutText}
        />
          )
        : null}

      {/* Render any additional components provided as children */}
      <View style={styles.children}>{children}</View>
    </View>
  );
};

export default Input;
