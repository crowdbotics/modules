import React, { useState, useContext } from "react";
import {
  Image,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { styles, textInputStyles } from "./styles";
import { OptionsContext } from "@options";
import { validateEmail } from "../constants";
import { resetPassword } from "../auth";

const PasswordRecover = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const [email, setEmail] = useState("");
  const { api } = useSelector((state) => state.Login);
  const dispatch = useDispatch();

  const handlePasswordReset = () => {
    if (!validateEmail.test(email))
      return Alert.alert("Error", "Please enter a valid email address.");

    dispatch(resetPassword({ email }))
      .then(unwrapResult)
      .then(() => {
        Alert.alert(
          "Password Reset",
          "Password reset link has been sent to your email address"
        );
        navigation.goBack();
      })
      .catch((err) => console.log(err.message));
  };

  const renderImage = () => {
    const imageSize = {
      width: 365,
      height: 161,
    };
    return (
      <Image
        style={[styles.image, imageSize]}
        source={{
          uri: options.LOGO_URL,
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.screen}>
        {renderImage()}
        <Text style={styles.heading}>{"Password Recovery"}</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="eg: yourname@gmail.com"
            size="small"
            style={styles.input}
            keyboardType="email-address"
            textStyle={styles.text}
            autoCapitalize="none"
          />
        </View>
        {!!api.error && (
          <Text
            style={[textInputStyles.error, { marginBottom: 10, fontSize: 12 }]}
          >
            {api.error.message}
          </Text>
        )}
        <TouchableOpacity
          disabled={api.loading === "pending"}
          activeOpacity={0.7}
          style={[styles.actionButon]}
          onPress={handlePasswordReset}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
            }}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={[styles.textRow]}>Back to login?</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default PasswordRecover;
