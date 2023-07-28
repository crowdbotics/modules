import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { OptionsContext } from "@options";

/**
 * Custom button component
 * @param  {String} color Background color for the button
 * @param  {String} textColor Color of button's text
 * @param  {Boolean} outline Indicates if the button should have some border
 * @param  {Boolean} hideShadow Indicates if the button should have some shadow or not
 * @param  {Object} style Extra styles that user has added
 * @param  {Function} onPress Function to run when button is pressed
 * @param  {String} buttonText Title of the button
 * @param  {React.ReactNode} children any extra components to render with button
 * @return {React.ReactNode}
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

  const backgroundColor = color || "#000";
  const buttonTextColor = textColor || "#fff";
  const btnStyle = {
    backgroundColor: outline ? "#fff" : backgroundColor,
    borderColor: outline ? backgroundColor : null,
    borderWidth: outline ? 1 : 0
  };
  const btnText = {
    color: outline ? "#000" : buttonTextColor
  };
  return (
    <View style={styles.btnContainer}>
      <View style={!hideShadow ? styles.shadowContainer : null}>
        <Pressable style={[styles.btn, btnStyle, style]} onPress={onPress}>
          <Text style={[styles.btnText, btnText]}>{buttonText}</Text>
          <View style={styles.childrenContainer}>{children}</View>
        </Pressable>
      </View>
    </View>
  );
};

export default Button;
