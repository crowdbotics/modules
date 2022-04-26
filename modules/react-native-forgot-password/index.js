import * as React from 'react';
import { Text, View } from 'react-native';
import options from "./options";
import TextInput from "./components/TextInput/index";
import Button from "./components/Button/index";

const  ForgotPassword = () => {
  return (
    <View style={options.styles.container}>
      <View style={options.styles.topHead}>
        <Text style={options.styles.mainHeading}>Forgot {"\n"} password</Text>
      </View>

      <View style={options.styles.inputSection}>
      <View style={options.styles.newPassword}>
        <Text style={options.styles.newpasswordText}>Set new password for your account.</Text>
      </View>
      <View style={options.styles.passwordInput}>
        <Text style={options.styles.newpasswordLabel}>Password</Text>
        <TextInput placeholder="Enter"></TextInput>
      </View>
      <View style={options.styles.confirmInput}>
        <Text style={options.styles.newpasswordLabel}>Confirm Password</Text>
        <TextInput placeholder="Enter"></TextInput>
      </View>
      </View>
      <View style={options.styles.resetButton}>
        <Button style={options.styles.resetBtn}>Reset password</Button>
      </View>
      <View style={options.styles.back}>
        <Text style={options.styles.backText}>Back</Text>
      </View>
    </View>
  );
}

export default {
  title: "Forgot password",
  navigator: ForgotPassword
}
