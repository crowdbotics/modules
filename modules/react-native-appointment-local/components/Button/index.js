
import React, { useContext } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { OptionsContext } from "@options";

/**
 * Custom button component
 * @param  {Function} onPress Function to be called when button is pressed
 * @param  {Boolean} disabled State which shows if the button is disabled or not
 * @param  {String} backgroundColor Hex code for background color of button
 * @param  {Number} height Height fot the button
 * @param  {String} color Hex code for text color
 * @param  {String} children Title of the button
 * @return {Promise}
 */
const Button = (props) => {
  const options = useContext(OptionsContext);
  const { styles } = options;
  const {
    onPress,
    disabled,
    backgroundColor,
    height,
    color,
    children
  } = props;

  return (
    <TouchableHighlight onPress={onPress} disabled={disabled} underlayColor='#DDDDDD'>
      <View style={[styles.button, {
        backgroundColor: backgroundColor || "#000000",
        height: height || 49
      }]}>
        <Text style={[styles.buttonText, { color: color || "#ffffff" }]}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;
