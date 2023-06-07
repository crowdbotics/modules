import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform
} from "react-native";
import {
  AppleButton,
  appleAuthAndroid
} from "@invertase/react-native-apple-authentication";
import { useSelector, useDispatch } from "react-redux";
import { HOME_SCREEN_NAME, validateEmail } from "./constants";
import { buttonStyles, textInputStyles, Color } from "./styles";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes
} from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from "../auth/utils";
import { appleForAndroid, appleForiOS } from "../auth/apple";
import {
  loginRequest,
  signupRequest,
  facebookLogin,
  googleLogin,
  appleLogin
} from "../auth";
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
      {props.loading
        ? (
        <ActivityIndicator
          color={props.loadingColor ? props.loadingColor : Color.white}
          style={props.loadingStyle}
        />
          )
        : (
        <Text style={[buttonStyles.textStyle, props.textStyle]}>
          {props.title}
        </Text>
          )}
    </View>
  </TouchableOpacity>
);

// Grouped Social Buttons View
const SocialButtonsView = (props) => (
  <View>
    <Text style={{ textAlign: "center", width: "100%", marginVertical: 5 }}>
      - or -
    </Text>
    <Button
      title="Signin with Facebook"
      viewStyle={{
        backgroundColor: Color.facebook,
        borderColor: Color.facebook,
        marginHorizontal: 5,
        marginBottom: 2
      }}
      textStyle={{ color: Color.white }}
      loading={props.loading}
      onPress={props.onFacebookConnect}
    />
    <GoogleSigninButton
      onPress={props.onGoogleConnect}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      disabled={props.loading}
      style={{ width: "99%", height: 48, marginHorizontal: 2 }}
    />
    {(Platform.OS === "ios" || appleAuthAndroid.isSupported) && (
      <AppleButton
        onPress={props.onAppleConnect}
        buttonStyle={AppleButton.Style.WHITE_OUTLINE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: "97%", // You must specify a width
          height: 44, // You must specify a height
          marginHorizontal: 5,
          marginTop: 2
        }}
      />
    )}
  </View>
);

const onFacebookConnect = async (dispatch, navigation) => {
  try {
    const fbResult = await LoginManager.logInWithPermissions([
      "public_profile",
      "email"
    ]);
    if (!fbResult.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();
      dispatch(facebookLogin({ access_token: data.accessToken }))
        .then(unwrapResult)
        .then((res) => {
          if (res.key) navigation.navigate(HOME_SCREEN_NAME);
        });
    }
  } catch (err) {
    console.log("Facebook Login Failed: ", JSON.stringify(err));
  }
};

const onGoogleConnect = async (dispatch, navigation) => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: false,
    iosClientId: GOOGLE_IOS_CLIENT_ID
  });
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    dispatch(googleLogin({ access_token: tokens.accessToken }))
      .then(unwrapResult)
      .then((res) => {
        if (res.key) navigation.navigate(HOME_SCREEN_NAME);
      });
  } catch (err) {
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert("Error", "The user canceled the signin request.");
    }
  }
};

const onAppleConnect = async (dispatch, navigation) => {
  try {
    const signinFunction = Platform.select({
      ios: appleForiOS,
      android: appleForAndroid
    });
    const result = await signinFunction();
    dispatch(
      appleLogin({ id_token: result.id_token, access_token: result.code })
    )
      .then(unwrapResult)
      .then((res) => {
        if (res.key) navigation.navigate(HOME_SCREEN_NAME);
      });
  } catch (err) {
    console.log(JSON.stringify(err));
  }
};

export const SignupTab = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });

  const { api } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onSignupPress = async () => {
    setValidationError({ email: "", password: "" });
    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }

    if (password !== confirmPassword) {
      return setValidationError({
        email: "",
        password: "Confirm password and password do not match."
      });
    }
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
        title="Sign Up"
        loading={api.loading === "pending"}
        onPress={onSignupPress}
      />
      <SocialButtonsView
        loading={api.loading === "pending"}
        onFacebookConnect={() => onFacebookConnect(dispatch, navigation)}
        onGoogleConnect={() => onGoogleConnect(dispatch, navigation)}
        onAppleConnect={() => onAppleConnect(dispatch, navigation)}
      />
      {!!api.error && (
        <Text style={textInputStyles.error}>{api.error.message}</Text>
      )}
    </KeyboardAvoidingView>
  );
};

export const SignInTab = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });

  const { api } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onSigninPress = async () => {
    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }

    dispatch(loginRequest({ username: email, password }))
      .then(unwrapResult)
      .then((res) => {
        if (res.token) navigation.navigate(HOME_SCREEN_NAME);
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
        title="Login"
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
          marginTop: 10
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
      <SocialButtonsView
        loading={api.loading === "pending"}
        onFacebookConnect={() => onFacebookConnect(dispatch)}
        onGoogleConnect={() => onGoogleConnect(dispatch)}
        onAppleConnect={() => onAppleConnect(dispatch)}
      />
    </KeyboardAvoidingView>
  );
};
