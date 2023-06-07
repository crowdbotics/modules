import * as React from "react";
import { Text, View, TextInput, TouchableHighlight, StyleSheet } from "react-native";

const pressed = () => {
  console.log("pressed");
};

const Token = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topHead}>
        <Text style={styles.mainHeading}>Token</Text>
      </View>
    <View style={styles.verification}>
        <Text style={styles.verificationText}>Verification</Text>
        <View style={styles.resendcodedetails}>
        <Text style={styles.resendcodeText}>4 digits PIN has been sent to your mail. </Text>
        <Text style={styles.resendcodeText}>Enter the code below to continue. <Text style={styles.boldText}>Resend code?</Text> </Text>
      </View>
      <View style={styles.pincodeArea}>
        <View style={styles.tokenFields}>
          <TextInput></TextInput>
        </View>
        <View style={styles.tokenFields}>
          <TextInput></TextInput>
        </View>
        <View style={styles.tokenFields}>
          <TextInput></TextInput>
        </View>
        <View style={styles.tokenFields}>
          <TextInput></TextInput>
        </View>
      </View>
    </View>

    <View style={styles.submitBtn}>
        <Button onPress={pressed} style={styles.submitButton}>Submit</Button>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topHead: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "20%"
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold"
  },
  container: {
    padding: 20,
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFF"
  },
  verification: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50%"
  },
  verificationText: {
    fontSize: 22
  },
  resendcodedetails: {
    paddingTop: 10
  },
  resendcodeText: {
    color: "rgba(0,0,0,0.5)"
  },
  boldText: {
    fontWeight: "bold",
    color: "#231F20"
  },
  pincodeArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25
  },
  tokenFields: {
    width: "16%",
    margin: 5,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10
  },
  submitBtn: {
    height: "30%",
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default Token;

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49,
        borderWidth: props.borderWidth ? props.borderWidth : 0,
        borderColor: props.borderColor ? props.borderColor : "#000000"
      }]}>
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
