import React, { useState, Fragment, useContext } from "react";
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
import { HOME_SCREEN_NAME, validateConfig, validateEmail } from "../utils";
import { OptionsContext } from "@options";

import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes
} from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { appleForAndroid, appleForiOS } from "../auth/apple";
import {
  loginRequest,
  signupRequest,
  facebookLogin,
  googleLogin,
  appleLogin
} from "../auth";
import { unwrapResult } from "@reduxjs/toolkit";

/**
 * A custom Text Input component
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the text input
 * @param {string} props.labelStyle - Styles for the label
 * @param {string} props.textInputStyle - Styles for the text input
 * @param {string} props.error - Error message to display (if any)
 * @returns {JSX.Element}
 */
export const TextInputField = ({
  label,
  labelStyle,
  textInputStyle,
  error,
  ...props
}) => {
  const options = useContext(OptionsContext);
  const { styles, Color } = options;
  return (
    <Fragment>
      <Text style={[styles.inputLabel, labelStyle]}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        style={[styles.textInput, textInputStyle]}
        placeholderTextColor={Color.steel}
        underlineColorAndroid={"transparent"}
        {...props}
      />
      {!!error && <Text style={styles.inputError}>{error}</Text>}
    </Fragment>
  );
};

/**
 * A custom Button component
 * @param {Object} props - Component props
 * @param {Function} props.onPress - Function to be executed on button press
 * @param {boolean} props.loading - Loading status of the button
 * @param {string} props.title - Button title
 * @param {Object} props.viewStyle - Styles for the button view
 * @param {Object} props.textStyle - Styles for the button text
 * @param {string} props.loadingColor - Color for the loading indicator
 * @param {Object} props.loadingStyle - Styles for the loading indicator
 * @returns {JSX.Element}
 */
export const Button = ({
  onPress,
  loading,
  title,
  viewStyle,
  textStyle,
  loadingColor,
  loadingStyle
}) => {
  const options = useContext(OptionsContext);
  const { styles, Color } = options;

  return (
    <TouchableOpacity
      style={[styles.viewStyle, viewStyle]}
      onPress={onPress}
      disabled={loading}
    >
      {loading
        ? (
        <ActivityIndicator
          color={loadingColor || Color.white}
          style={loadingStyle}
        />
          )
        : (
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
          )}
    </TouchableOpacity>
  );
};

/**
 * A group containing Facebook, Apple, and Google login buttons
 * @param {Object} props - Component props
 * @param {Function} props.onFacebookConnect - Function to handle Facebook login
 * @param {Function} props.onGoogleConnect - Function to handle Google login
 * @param {Function} props.onAppleConnect - Function to handle Apple login
 * @param {boolean} props.loading - Loading status of the buttons
 * @returns {JSX.Element}
 */
const SocialButtons = ({
  onFacebookConnect,
  onGoogleConnect,
  onAppleConnect,
  loading
}) => {
  const options = useContext(OptionsContext);
  const { styles, Color } = options;

  return (
<Fragment>
    <Text style={styles.orText}>
      - or -
    </Text>
    <Button
      title="Signin with Facebook"
      viewStyle={styles.facebookButton}
      textStyle={{ color: Color.white }}
      loading={loading}
      onPress={onFacebookConnect}
    />
    <GoogleSigninButton
      onPress={onGoogleConnect}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      disabled={loading}
      style={styles.googleLoginButton}
    />
    {(Platform.OS === "ios" || appleAuthAndroid.isSupported) && (
      <AppleButton
        onPress={onAppleConnect}
        buttonStyle={AppleButton.Style.WHITE_OUTLINE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.appleButton}
      />
    )}
  </Fragment>
  );
};

/**
 * Request and generate Facebook access token and store it in the DB via REST API
 * @param {Function} dispatch - Hook to dispatch actions
 * @param {Function} navigation - Navigation method to navigate through screens
 * @param {Function} setErrorResponse - State to be set with error
 * @returns {Promise}
 */
const onFacebookConnect = async (dispatch, navigation, setErrorResponse) => {
  // The platform to authorize from.That can be either web or Facebook's mobile app
  LoginManager.setLoginBehavior("web_only");
  try {
    // Scopes for login details
    const fbResult = await LoginManager.logInWithPermissions([
      "public_profile",
      "email"
    ]);
    if (!fbResult.isCancelled) {
      // Fetch accessToken after successfull authorization
      const data = await AccessToken.getCurrentAccessToken();
      // This action dispatches the api for facebook login which takes FB accessToken in params
      dispatch(facebookLogin({ access_token: data.accessToken }))
        .then(unwrapResult)
        .then((res) => {
          if (res.key) {
            // Success message will appear once api is successfull
            Alert.alert(
              "SignIn Success",
              "You are Logged In Successfully with Facebook Account.");
            // This navigates the user to the home screen of the app
            navigation.navigate(HOME_SCREEN_NAME);
          }
        })
        .catch(err => {
          // Error message will displayed if something goes wrong in authorization
          setErrorResponse(errorResponse => [...errorResponse, err]);
        });
    } else {
      // Error message will displayed if user stops the authorization process willingly
      setErrorResponse(errorResponse => [
        ...errorResponse,
        { error: "The user canceled the signin request." }
      ]);
    }
  } catch (err) {
    // Error message will displayed if the SDK fails to initialize
    setErrorResponse(errorResponse => [
      ...errorResponse,
      { error: "Something went wrong" }
    ]);
  }
};

/**
 * Request and generate Google access token and store it in the DB via REST API
 * @param {Function} dispatch - Hook to dispatch actions
 * @param {Function} navigation - Navigation method to navigate through screens
 * @param {Function} setErrorResponse - State to be set with error
 * @param {string} GOOGLE_WEB_CLIENT_ID - Web oAuth client id
 * @param {string} GOOGLE_IOS_CLIENT_ID - iOS oAuth client id
 * @returns {Promise}
 */
const onGoogleConnect = async (
  dispatch,
  navigation,
  setErrorResponse,
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID
) => {
  // Variable to check if any key is not defined
  const errors = validateConfig(GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID);
  if (!errors.length) {
    // This configures the login setup with provided credentials
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: false,
      iosClientId: GOOGLE_IOS_CLIENT_ID
    });
    try {
      // Checks if user has google play services enabled
      await GoogleSignin.hasPlayServices();
      // Initializes the Overlay
      await GoogleSignin.signIn();
      // Fetches the token
      const tokens = await GoogleSignin.getTokens();
      // This action dispatches the api for google login which takes accessToken in params
      dispatch(googleLogin({ access_token: tokens.accessToken }))
        .then(unwrapResult)
        .then(async res => {
          if (res.key) {
            // Success message will be displayed once the authorization is successfull and user is successfully logged in
            Alert.alert(
              "SignIn Success",
              "You are Logged In Successfully with Google Account.");
            navigation.navigate(HOME_SCREEN_NAME);
          }
        })
        .catch(err => {
          // Error message will displayed if something goes wrong in authorization
          setErrorResponse(errorResponse => [...errorResponse, err]);
        });
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // Error message will displayed if user stops the authorization process willingly
        setErrorResponse(errorResponse => [
          ...errorResponse,
          { error: "The user canceled the signin request." }
        ]);
      }
    }
  }
};

/**
 * Request and generate Apple identity and authorization token and store it in the DB via REST API
 * @param {Function} dispatch - Hook to dispatch actions
 * @param {Function} navigation - Navigation method to navigate through screens
 * @param {Function} setErrorResponse - State to be set with error
 * @param {string} APPLE_SERVICE_ID - Service id for apple login
 * @param {string} APPLE_REDIRECT_CALLBACK - Redirect callback for apple login
 * @returns {Promise}
 */
const onAppleConnect = async (
  dispatch,
  navigation,
  setErrorResponse,
  APPLE_SERVICE_ID,
  APPLE_REDIRECT_CALLBACK
) => {
  try {
    // This variable selects the function according to the device platform
    const signinFunction = Platform.select({
      ios: appleForiOS,
      android: appleForAndroid(APPLE_SERVICE_ID, APPLE_REDIRECT_CALLBACK)
    });
    // Fetch credentials
    const result = await signinFunction();
    if (result.identityToken && result.authorizationCode) {
      // This action dispatches the api for apple login which takes the identity token and accessToken in params
      dispatch(
        appleLogin({
          id_token: result.identityToken,
          access_token: result.authorizationCode
        })
      )
        .then(unwrapResult)
        .then(async res => {
          if (res.key) {
            // Success message will be displayed once the authorization is successfull and user is successfully logged in
            Alert.alert(
              "SignIn Success",
              "You are Logged In Successfully with Apple Account.");
            navigation.navigate(HOME_SCREEN_NAME);
          }
        })
        .catch(error => {
          // Error message will displayed if something goes wrong in authorization
          setErrorResponse(errorResponse => [...errorResponse, error]);
        });
    }
  } catch (err) {
    const errObj = { error: err };
    // Error message will displayed if the SDK fails to initialize
    setErrorResponse(errorResponse => [...errorResponse, errObj]);
  }
};

/**
 * Sign Up Tab component
 * @param {Object} props - Component props
 * @param {Function} props.navigation - Navigation method to navigate through screens
 * @returns {JSX.Element}
 */
export const SignupTab = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { styles, GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID, APPLE_SERVICE_ID, APPLE_REDIRECT_CALLBACK } = options;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState([]);
  const [errorResponse, setErrorResponse] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  // Specific validations for email and password
  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });
  const { api } = useSelector((state) => state.Login);
  const dispatch = useDispatch();

  // This function empties the text inputs once called
  const emptyStates = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const onSignupPress = async () => {
    setApiError([]);
    setErrorResponse([]);
    setValidationError({ email: "", password: "" });
    // Error message will be displayed if user has not entered a valid email
    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    }
    // Error message will be displayed if user has not entered a valid password
    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }
    // Error message will be displayed if the password and confirm password do not match
    if (password !== confirmPassword) {
      return setValidationError({
        email: "",
        password: "Confirm password and password do not match."
      });
    }
    // This action dispatches the signup api with email and password as params
    dispatch(signupRequest({ email, password }))
      .then(unwrapResult)
      .then(() => {
        // The success message will be displayed once signup is successfull
        Alert.alert(
          "Signup Success",
          "Registration Successful. A confirmation will be sent to your e-mail address."
        );
        emptyStates();
      })
      .catch((err) => {
        // Error message will be displayed if the signup gets rejected from the backend
        setApiError(apiError => [...apiError, err]);
      });
  };

  // This function updates the value of email state once user starts typing
  const handleEmailChange = (value) => {
    setEmail(value);
    setValidationError({ ...validationError, email: "" });
  };
  // This function updates the value of password state once user starts typing
  const handlePasswordChange = (value) => {
    setPassword(value);
    setValidationError({ ...validationError, password: "" });
  };
  // This function updates the value of confirmPassword state once user starts typing
  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setValidationError({ ...validationError, password: "" });
  };

  return (
    <KeyboardAvoidingView>
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <TextInputField
          keyboardType="email-address"
          label="Email address"
          placeholder="Email address"
          onChangeText={handleEmailChange}
          value={email}
          error={validationError.email}
        />
        <TextInputField
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={password}
          error={validationError.password}
        />
        <TextInputField
          label="Confirm Password"
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
        />
      </View>
      {apiError.map((value, index) =>
              <View key={index}>
                <Text style={[styles.error, { paddingHorizontal: 0 }]}>{value[Object.keys(value)[index]]?.toString()}</Text>
              </View>
      )}
      <Button
        title="Sign Up"
        loading={api.loading === "pending"}
        onPress={onSignupPress}
      />
        {errorResponse.map((value, index) =>
              <View key={index}>
                <Text style={styles.error1}>{value[Object.keys(value)[index]]?.toString()}</Text>
              </View>
        )}
      <SocialButtons
        loading={api.loading === "pending"}
        onFacebookConnect={() => {
          setErrorResponse([]);
          onFacebookConnect(dispatch, navigation, setErrorResponse);
        }}
        onGoogleConnect={() => {
          setErrorResponse([]);
          onGoogleConnect(
            dispatch,
            navigation,
            setErrorResponse,
            GOOGLE_WEB_CLIENT_ID,
            GOOGLE_IOS_CLIENT_ID
          );
        }}
        onAppleConnect={() => {
          setErrorResponse([]);
          onAppleConnect(
            dispatch,
            navigation,
            setErrorResponse,
            APPLE_SERVICE_ID,
            APPLE_REDIRECT_CALLBACK
          );
        }}
      />
    </KeyboardAvoidingView>
  );
};

/**
 * Sign In Tab component
 * @param {Object} props - Component props
 * @param {Function} props.navigation - Navigation method to navigate through screens
 * @returns {JSX.Element}
 */
export const SignInTab = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const {
    styles,
    GOOGLE_IOS_CLIENT_ID,
    GOOGLE_WEB_CLIENT_ID,
    APPLE_SERVICE_ID,
    APPLE_REDIRECT_CALLBACK
  } = options;

  const [email, setEmail] = useState("");
  const [errorResponse, setErrorResponse] = useState([]);
  const [apiError, setApiError] = useState([]);
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });

  const emptyStates = () => {
    setEmail("");
    setPassword("");
  };

  const { api } = useSelector((state) => state.Login);
  const dispatch = useDispatch();

  const onSigninPress = async () => {
    setApiError([]);
    setErrorResponse([]);
    // Error message will be displayed if user has not entered a valid email
    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    }
    // Error message will be displayed if user has not entered a valid password
    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }
    // This action dispatches the login api with email and password as params
    dispatch(loginRequest({ username: email, password }))
      .then(unwrapResult)
      .then((res) => {
        if (res.token) {
          // Success message will be displayed once login api is successfull
          Alert.alert(
            "Login Success",
            "You are Logged In successfully");
          emptyStates();
          navigation.navigate(HOME_SCREEN_NAME);
        };
      })
      .catch((err) => {
        setApiError(apiError => [...apiError, err]);
      });
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setValidationError({ ...validationError, email: "" });
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setValidationError({ ...validationError, password: "" });
  };

  return (
    <KeyboardAvoidingView>
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <TextInputField
          keyboardType="email-address"
          label="Email address"
          placeholder="Email address"
          onChangeText={handleEmailChange}
          value={email}
          error={validationError.email}
        />
        <TextInputField
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={password}
          error={validationError.password}
        />
      </View>
      {
            apiError.map((value, index) =>
              <View key={index}>
                <Text style={[styles.error, { paddingHorizontal: 0 }]}>{value[Object.keys(value)[index]]?.toString()}</Text>
              </View>
            )
          }
      <Button
        title="Login"
        loading={api.loading === "pending"}
        onPress={onSigninPress}
      />
      <View
        style={styles.forgotPasswordView}
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
      {errorResponse.map((value, index) =>
              <View key={index}>
                <Text style={styles.error1}>{value[Object.keys(value)[index]].toString()}</Text>
              </View>
      )}
      <SocialButtons
        loading={api.loading === "pending"}
        onFacebookConnect={() => {
          setErrorResponse([]);
          onFacebookConnect(dispatch, navigation, setErrorResponse);
        }}
        onGoogleConnect={() => {
          setErrorResponse([]);
          onGoogleConnect(
            dispatch,
            navigation,
            setErrorResponse,
            GOOGLE_WEB_CLIENT_ID,
            GOOGLE_IOS_CLIENT_ID
          );
        }}
        onAppleConnect={() => {
          setErrorResponse([]);
          onAppleConnect(
            dispatch,
            navigation,
            setErrorResponse,
            APPLE_SERVICE_ID,
            APPLE_REDIRECT_CALLBACK
          );
        }}
      />
    </KeyboardAvoidingView>
  );
};
