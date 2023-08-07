import React, { useContext } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { OptionsContext } from "@options";
/**
 * A custom button component with customizable appearance and behavior.
 * @param {function} onPress - The function to be called when the button is pressed.
 * @param {boolean} disabled - Determines if the button is disabled or not (default: false).
 * @param {string} backgroundColor - The background color of the button (default: "#000000" when enabled, "#cccccc" when disabled).
 * @param {number} height - The height of the button in pixels (default: 49).
 * @param {string} color - The text color of the button (default: "#ffffff").
 * @param {ReactNode} children - The content to be displayed inside the button.
 * @returns {JSX.Element} - The Button component.
 */
const Button = ({
  onPress,
  disabled = false,
  backgroundColor = disabled ? "#cccccc" : "#000000",
  height = 49,
  color = "#ffffff",
  children
}) => {
  const { styles } = useContext(OptionsContext);

  const buttonStyle = {
    backgroundColor: backgroundColor,
    height: height
  };

  const textStyle = {
    color: color
  };

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      underlayColor="#DDDDDD"
    >
      <View style={[styles.buttonView, buttonStyle]}>
        <Text style={[styles.buttonTitle, textStyle]}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;
