import React, { useContext } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { OptionsContext } from "@options";

/**
 * Custom Button Component.
 * @param {Object} props - Component props.
 * @param {Function} props.onPress - Function to be called when the button is pressed.
 * @param {boolean} props.disabled - Indicates whether the button is disabled or not.
 * @param {boolean} props.clicked - Indicates whether the button is in the clicked state or not.
 * @param {React.ReactNode} props.children - Components to render inside the button.
 * @returns {React.ReactNode} - The custom button component.
 */
const Button = ({ onPress, disabled, children, clicked }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      underlayColor="#DDDDDD"
    >
      <View style={!clicked ? styles.button : styles.clicked}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;
