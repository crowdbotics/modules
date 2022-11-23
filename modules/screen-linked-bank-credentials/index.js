import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TextInput
} from "react-native";

const LinkedBankCredentials = () => {
  const [bank, setBank] = useState({});
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setBank({
      name: "Bank Name",
      image: require("./assets/userImage.png")
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.heading}>Bank</Text>
          <Text style={styles.subHeading}>Credentials</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.bankName}>{bank.name}</Text>
          <Input
            text="Account Name"
            value={accountName}
            onChange={setAccountName}
          />
          <Input text="Password" value={password} onChange={setPassword} />
          <View style={styles.bankImageContainer}>
            <Image source={bank.image} style={styles.bankImage} />
          </View>
        </View>
        <Button buttonText="Request withdrawal" style={styles.button} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  header: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 24
  },
  subHeading: {
    fontSize: 12,
    color: "#999"
  },
  cardContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: 60,
    paddingHorizontal: 10,
    paddingBottom: 20,
    elevation: 5,
    shadowColor: "rgba(0,0,0,0.5)"
  },
  bankImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    padding: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    top: -50,
    left: 138
  },
  bankImage: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  bankName: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center"
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10
  },
  barText: {
    marginLeft: 10,
    marginVertical: 10
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  button: {
    marginTop: 80,
    marginHorizontal: 40
  }
});

export default LinkedBankCredentials;

const Button = (params) => {
  const backgroundColor = params.color || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.outlineColor || backgroundColor,
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
          onPress={params.onPress}
        >
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

const Input = (props) => {
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
        onChangeText={(text) => props.onChange(text)}
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
    // flex: 1
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
    height: 50
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
