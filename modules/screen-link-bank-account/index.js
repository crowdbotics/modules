import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Image
} from "react-native";

const LinkBankAccount = () => {
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Link Bank Account</Text>
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            By providing your bank credentials, you are enabling the app or API
            to retrieve your financial data.
          </Text>
        </View>
        <Input
          text="Bank Name"
          value={bankName}
          onChange={setBankName}
          containerStyle={styles.input}
        />
        <Input
          text="Account Name"
          value={accountName}
          onChange={setAccountName}
          containerStyle={styles.input}
        />
        <Input
          text="Password"
          value={password}
          onChange={setPassword}
          containerStyle={styles.input}
          secureTextEntry
        />
        <Button buttonText="Submit" style={styles.button} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 24,
    alignSelf: "center",
    marginTop: 20
  },
  warningContainer: {
    marginHorizontal: 10,
    marginBottom: 40,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderColor: "#77838F",
    borderWidth: 1,
    borderRadius: 5
  },
  warningText: {
    fontSize: 14,
    textAlign: "center"
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 40
  }
});

export default LinkBankAccount;

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
        backgroundColor={props.backgroundColor || "#f9f9f9"}
        secureTextEntry={props.secureTextEntry}
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
const Button = params => {
  const backgroundColor = params.backgroundColor || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.borderColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={params.onPress}>
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={styles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
