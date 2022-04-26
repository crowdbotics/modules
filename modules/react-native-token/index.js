import * as React from 'react';
import { Text, View, Image } from 'react-native';
import options from "./options";
import TextInput from "./components/TextInput/index";
import Button from "./components/Button/index";


const Token= () => {
  return (
    <View style={options.styles.container}>
      <View style={options.styles.topHead}>
        <Text style={options.styles.mainHeading}>Token</Text>
      </View>
    <View style={options.styles.verification}>
        <Text style={options.styles.verificationText}>Verification</Text>
        <View style={options.styles.resendcodedetails}>
        <Text style={options.styles.resendcodeText}>4 digits PIN has been sent to your mail. </Text>
        <Text style={options.styles.resendcodeText}>Enter the code below to continue. <Text style={options.styles.boldText}>Resend code?</Text> </Text>
      </View>
      <View style={options.styles.pincodeArea}>
        <View style={options.styles.tokenFields}>
          <TextInput></TextInput>
        </View>
        <View style={options.styles.tokenFields}>
          <TextInput></TextInput>
        </View>
        <View style={options.styles.tokenFields}>
          <TextInput></TextInput>
        </View>
        <View style={options.styles.tokenFields}>
          <TextInput></TextInput>
        </View>
      </View>
    </View>

    <View style={options.styles.submitBtn}>
        <Button style={options.styles.submitButton}>Submit</Button>
    </View>
    </View>
  );
}

export default {
  title: "Token",
  navigator: Token
}
