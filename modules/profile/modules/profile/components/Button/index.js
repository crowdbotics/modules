import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { OptionsContext } from "@options";

/**
 * Custom button component
 * @param {Object} params - The button component props
 * @param {String} params.color - Background color for the button
 * @param {String} params.textColor - Color of button's text
 * @param {Boolean} params.outline - Indicates if the button should have a border
 * @param {Boolean} params.hideShadow - Indicates if the button should have a shadow or not
 * @param {Object} params.style - Extra styles to be applied to the button
 * @param {Function} params.onPress - Function to be executed when the button is pressed
 * @param {String} params.buttonText - Title of the button
 * @param {React.ReactNode} params.children - Any extra components to render with the button
 * @returns {React.ReactNode} - The button component
 */
const Button = (params) => {
  const options = useContext(OptionsContext);
  const { styles } = options;
  const {
    color,
    textColor,
    outline,
    hideShadow,
    style,
    onPress,
    buttonText,
    children
  } = params;

  // Determine the background color and text color based on the provided props
  const backgroundColor = color || "#000";
  const buttonTextColor = textColor || "#fff";

  // Create the style object for the button based on the outline prop
  const btnStyle = {
    backgroundColor: outline ? "#fff" : backgroundColor,
    borderColor: outline ? backgroundColor : null,
    borderWidth: outline ? 1 : 0
  };

  // Create the style object for the button text based on the outline prop
  const btnText = {
    color: outline ? "#000" : buttonTextColor
  };

  return (
    <View style={styles.btnContainer}>
      {/* Apply shadow to the button if hideShadow prop is not true */}
      <View style={!hideShadow ? styles.shadowContainer : null}>
        <Pressable style={[styles.btn, btnStyle, style]} onPress={onPress}>
          <Text style={[styles.btnText, btnText]}>{buttonText}</Text>
          {/* Render any additional components provided as children */}
          <View style={styles.childrenContainer}>{children}</View>
        </Pressable>
      </View>
    </View>
  );
};

export default Button;
