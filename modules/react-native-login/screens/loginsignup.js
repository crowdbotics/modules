import React, { useState, useContext} from "react";
import { OptionsContext} from "@options";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { buttonStyles, textInputStyles, Color } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { loginRequest, signupRequest } from "../auth";
import { unwrapResult } from "@reduxjs/toolkit";

// Custom Text Input
export const TextInputField = (props) => (
  <View>
    <Text style={[textInputStyles.label, props.labelStyle]}>{props.label}</Text>
    <TextInput
      autoCapitalize="none"
      style={[textInputStyles.textInput, props.textInputStyle]}
      placeholderTextColor={Color.steel}
      underlineColorAndroid={"transparent"}
      {...props}
    />
    {!!props.error && <Text style={textInputStyles.error}>{props.error}</Text>}
  </View>
);

// Custom Button
export const Button = (props) => (
  <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
    <View style={[buttonStyles.viewStyle, props.viewStyle]}>
      {props.loading ? (
        <ActivityIndicator
          color={props.loadingColor ? props.loadingColor : Color.white}
          style={props.loadingStyle}
        />
      ) : (
        <Text style={[buttonStyles.textStyle, props.textStyle]}>
          {props.title}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

// Signup Component Tab

export const SignupTab = ( navigation ) => {
  const options = useContext(OptionsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });
  const { api } = useSelector((state) => state.Login);
  const dispatch = useDispatch();

  const onSignupPress = async () => {
    setValidationError({ email: "", password: "" });
    if (!options.validateEmail.test(email))
      return setValidationError({
        email: "Please enter a valid email address.",
        password: "",
      });

    if (!password)
      return setValidationError({
        email: "",
        password: "Please enter a valid password",
      });

    if (password !== confirmPassword)
      return setValidationError({
        email: "",
        password: "Confirm password and password do not match.",
      });
    dispatch(signupRequest({ email, password }))
      .then(unwrapResult)
      .then(() => {
        Alert.alert(
          "Signup Success",
          "Registration Successful. A confirmation will be sent to your e-mail address."
        );
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <KeyboardAvoidingView>
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <TextInputField
          keyboardType="email-address"
          label="Email address"
          placeholder="Email address"
          onChangeText={(value) => setEmail(value)}
          value={email}
          error={validationError.email}
        />
        <TextInputField
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
          error={validationError.password}
        />
        <TextInputField
          label="Confirm Password"
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(value) => setConfirmPassword(value)}
          value={confirmPassword}
        />
      </View>
      <Button
        title={options.SignUpButtonText}
        loading={api.loading === "pending"}
        onPress={onSignupPress}
      />
      {!!api.error && (
        <Text style={textInputStyles.error}>{api.error.message}</Text>
      )}
    </KeyboardAvoidingView>
  );
};

export const SignInTab = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const { api } = useSelector((state) => state.Login);
  const dispatch = useDispatch();

  const onSigninPress = async () => {
    if (!options.validateEmail.test(email))
      return setValidationError({
        email: "Please enter a valid email address.",
        password: "",
      });

    if (!password)
      return setValidationError({
        email: "",
        password: "Please enter a valid password",
      });

    dispatch(loginRequest({ username: email, password }))
      .then(unwrapResult)
      .then((res) => {
        if (res.token) navigation.navigate(options.HOME_SCREEN_NAME);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <KeyboardAvoidingView>
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <TextInputField
          keyboardType="email-address"
          label="Email address"
          placeholder="Email address"
          onChangeText={(value) => setEmail(value)}
          value={email}
          error={validationError.email}
        />
        <TextInputField
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
          error={validationError.password}
        />
      </View>

      <Button
        title={options.SignInButtonText}
        loading={api.loading === "pending"}
        onPress={onSigninPress}
      />
      {!!api.error && (
        <Text style={textInputStyles.error}>{api.error.message}</Text>
      )}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("PasswordReset");
          }}
        >
          <Text>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
