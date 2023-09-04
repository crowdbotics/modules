import React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  StyleSheet
} from "react-native";

export const Input = props => {
  return (
      <View style={[inputStyles.inputContainer, props.containerStyle]}>
        {props.text
          ? (
            <Text style={inputStyles.inputText}>{props.text}</Text>
            )
          : null}

        <TextInput
          style={[
            inputStyles.input,
            props.style,
            props.textArea ? inputStyles.textArea : null
          ]}
          placeholder={props.placeholder ? props.placeholder : "Enter"}
          value={props.value}
          onChangeText={(value) => props.onChange(value)}
          placeholderTextColor={
            props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
          }
          editable={props.editable !== false}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={!!props.textArea}
          backgroundColor={props.backgroundColor}
          secureTextEntry={props.secureTextEntry}
        />
        {props.errorText
          ? (
            <Text style={inputStyles.error}>{props.errorText}</Text>
            )
          : null}
        {props.icon
          ? (
            <Pressable
              onPress={() => props.iconOnPress()}
              style={inputStyles.iconWithText}>
              <Image source={props.icon} style={inputStyles.icon} />
            </Pressable>
            )
          : null}
        <View style={inputStyles.children}>{props.children}</View>
      </View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  inputText: {
    fontSize: 14,
    color: "#000"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 15,
    marginVertical: 10,
    width: "100%",
    height: 50,
    color: "#000"
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    bottom: 25,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {},
  error: { color: "#f77474" }
});
