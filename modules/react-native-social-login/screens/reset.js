import React, { useState, useContext } from "react";
import {
  Image,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateEmail, LOGO_URL } from "../utils";
import { resetPassword } from "../auth";
import { OptionsContext } from "@options";

const PasswordRecover = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;
  const [email, setEmail] = useState("");
  // State for reset password Api errors
  const [errorResponse, setErrorResponse] = useState([]);

  // This variable fetches the loading and error status from the store
  const { api } = useSelector(state => state.Login);
  const dispatch = useDispatch();

  // Error message will be displayed if user has not entered a valid email
  const handlePasswordReset = () => {
    if (!validateEmail.test(email)) { return Alert.alert("Error", "Please enter a valid email address."); }
    // This action dispatches the reset password api with email as params
    dispatch(resetPassword({ email }))
      .then(unwrapResult)
      .then(() => {
        Alert.alert(
          "Password Reset",
          "Password reset link has been sent to your email address"
        );
        navigation.goBack();
      })
      .catch(err => { setErrorResponse(errorResponse => [...errorResponse, err]); });
  };

  const renderImage = () => {
    const imageSize = {
      width: 365,
      height: 161
    };
    return (
      <Image
        style={[styles.image, imageSize]}
        source={{
          uri: LOGO_URL
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
            onChangeText={value => setEmail(value)}
            placeholder="eg: yourname@gmail.com"
            size="small"
            style={styles.input}
            keyboardType="email-address"
            textStyle={styles.text}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          disabled={api.loading === "pending"}
          activeOpacity={0.7}
          style={[styles.actionButon]}
          onPress={handlePasswordReset}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 15
            }}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
        {
        errorResponse.map((value, index) =>
          <View key={index}>
            <Text style={styles.error1}>{value[Object.keys(value)[index]].toString()}</Text>
          </View>
        )
      }
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
