import React, { useContext } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { OptionsContext } from "@options";

/**
 * Custom Text Input Component
 * @param  {Object} containerStyle Styles for the main input container
 * @param  {String} text Label for the input
 * @param  {Object} style extra styles for the Text Input
 * @param  {Object} textArea Defines the area to input text
 * @param  {String} placeholder Placeholder text
 * @param  {String} value Default and current value
 * @param  {Function} onChange Function to update input's state
 * @param  {String} placeholderTextColor Color of the placeholder
 * @param  {Boolean} editable This indicates whether the input's value can be changed or not
 * @param  {String} errorText Error message
 * @param  {String} icon Source link for the icon
 * @param  {React.ReactNode} children Components to render beside the input
 * @return {React.ReactNode}
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
  const options = useContext(OptionsContext);
  const { styles } = options;

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {text ? <Text style={styles.inputText}>{text}</Text> : null}
      <TextInput
        style={[styles.input, style, textArea ? styles.textArea : null]}
        placeholder={placeholder || "Enter"}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={
          placeholderTextColor || "#9B9B9B"
        }
        editable={editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!textArea}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      {icon
        ? (
        <Image
          source={icon}
          style={text ? styles.iconWithText : styles.iconWithoutText}
        />
          )
        : null}
      <View style={styles.children}>{children}</View>
    </View>
  );
};

export default Input;
