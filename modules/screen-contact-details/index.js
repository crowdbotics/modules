import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView
} from "react-native";

const ContactDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.roundIconContainer}>
            <Image
              source={require("./assets/videoIcon.png")}
              style={styles.icon}
            />
          </View>
        </View>
        <Input
          text="First Name"
          value={firstName}
          onChange={setFirstName}
          containerStyle={styles.input}
        />
        <Input
          text="Last Name"
          value={lastName}
          onChange={setLastName}
          containerStyle={styles.input}
        />
        <Input
          text="Email Address"
          value={email}
          onChange={setEmail}
          containerStyle={styles.input}
        />
        <Input
          text="Phone Number"
          value={phone}
          onChange={setPhone}
          containerStyle={styles.input}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: "#FCF1D6",
    height: 180,
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginBottom: 20
  },
  roundIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  input: {
    paddingHorizontal: 20
  }
});

export default ContactDetails;

const Input = props => {
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
        onChangeText={() => props.onChange()}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Image
          source={props.icon}
          style={
            props.text ? inputStyles.iconWithText : inputStyles.iconWithoutText
          }
        />
          )
        : null}
      <View style={styles.children}>{props.children}</View>
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
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50,
    color: "#000"
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    top: 48,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  iconWithoutText: {
    position: "absolute",
    right: 30,
    top: 28,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {}
});
