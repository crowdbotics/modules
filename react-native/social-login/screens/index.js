import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { HOME_SCREEN_NAME, BACKGROUND_URL, LOGO_URL, validateEmail } from './constants.js';
import {
  apiLoginRequest,
  apiSignupRequest,
  apiFacebookConnect,
  apiGoogleConnect,
} from '../auth/actions';
import reducer from '../auth/reducers';
import { API_LOGIN_FAILED, API_SIGNUP_FAILED } from '../auth/constants';
import { styles, buttonStyles, textInputStyles, Color } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import {
  createNavigator,
  createAppContainer,
  TabRouter,
} from 'react-navigation';

// Custom Text Input
const TextInputField = props => (
  <View>
    <Text style={[textInputStyles.label, props.labelStyle]}>{props.label}</Text>
    <TextInput
      autoCapitalize="none"
      style={[textInputStyles.textInput, props.textInputStyle]}
      placeholderTextColor={Color.steel}
      underlineColorAndroid={'transparent'}
      {...props}
    />
    {!!props.error && <Text style={textInputStyles.error}>{props.error}</Text>}
  </View>
);

// Custom Button
const Button = props => (
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

// Grouped Social Buttons View
const SocialButtonsView = props => (
  <View>
    <Button
      title="Connect with Facebook"
      viewStyle={{
        ...styles.socialButton,
        borderColor: Color.facebook,
      }}
      textStyle={{ color: Color.facebook }}
      loading={props.loading}
      onPress={props.onFacebookConnect}
    />
    <Button
      title="Connect with Google"
      viewStyle={{ ...styles.socialButton, borderColor: Color.google }}
      textStyle={{ color: Color.google }}
      loading={props.loading}
      onPress={props.onGoogleConnect}
    />
  </View>
);

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      requestError: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { api, user } = this.props;
    if (prevProps.api.isLoading && api.error?.type === API_SIGNUP_FAILED) {
      const error =
        api.error.code == 400
          ? 'This email is already registered.'
          : requestError.message;

      Alert.alert('Error', error);
      this.setState({
        requestError: api.error,
      });
    }
    if (prevProps.api.isLoading && api.success && user !== {}) {
      Alert.alert(
        'Signup Success',
        'Registration Successful. A confirmation will be sent to your e-mail address.'
      );
    }
  }

  onSignupPress = async () => {
    const { email, password, confirmPassword } = this.state;
    if (validateEmail.test(email)) {
      if (password != '') {
        if (password == confirmPassword) {
          this.props.signup(email, password);
        } else {
          this.setState({
            confirmPasswordError: 'Confirm password and password do not match',
          });
        }
      } else {
        this.setState({ passwordError: 'Please enter a valid password' });
      }
    } else {
      this.setState({ emailError: 'Please enter a valid email address' });
    }
  };

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
      confirmPassword,
      confirmPasswordError,
    } = this.state;
    return (
      <KeyboardAvoidingView>
        <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
          <TextInputField
            keyboardType="email-address"
            label="Email address"
            placeholder="Email address"
            onChangeText={email => this.setState({ email })}
            value={email}
            error={emailError}
          />
          <TextInputField
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            value={password}
            error={passwordError}
          />
          <TextInputField
            label="Confirm Password"
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            value={confirmPassword}
            error={confirmPasswordError}
          />
        </View>
        <Button
          title="Sign Up"
          loading={this.props.api.isLoading}
          onPress={this.onSignupPress}
        />
        <SocialButtonsView
          loading={this.props.api.isLoading}
          onFacebookConnect={this.props.connect_to_facebook}
          onGoogleConnect={this.props.connect_to_google}
        />
        {!!this.state.requestError && (
          <Text style={textInputStyles.error}>
            {this.state.requestError.message}
          </Text>
        )}
      </KeyboardAvoidingView>
    );
  }
}

class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      authLoading: false,
      fbLoading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { api, token } = this.props;
    if (prevProps.api.isLoading && api.error?.type === API_LOGIN_FAILED) {
      Alert.alert('Login Error', api.error.message);
    }
    if (token) {
      this.props.navigation.navigate(HOME_SCREEN_NAME);
    }
  }

  onSigninPress = () => {
    const { email, password } = this.state;
    if (validateEmail.test(email)) {
      if (password != '') {
        this.props.login(email, password);
        this.setState({ authLoading: false });
      } else {
        this.setState({ passwordError: 'Please enter a valid password' });
      }
    } else {
      this.setState({ emailError: 'Please enter a valid email address' });
    }
  };

  onPressFacebookLogin = () => {
    this.props.connect_to_facebook();
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;
    return (
      <KeyboardAvoidingView>
        <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
          <TextInputField
            keyboardType="email-address"
            label="Email address"
            placeholder="Email address"
            onChangeText={email => this.setState({ email })}
            value={email}
            error={emailError}
          />
          <TextInputField
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            value={password}
            error={passwordError}
          />
        </View>

        <Button
          title="Login"
          loading={this.props.api.isLoading}
          onPress={this.onSigninPress}
        />
        <SocialButtonsView
          loading={this.props.api.isLoading}
          onFacebookConnect={this.props.connect_to_facebook}
          onGoogleConnect={this.props.connect_to_google}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate('PasswordReset');
            }}>
            <Text>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// Tabs
const CustomTabBar = ({ navigation }) => {
  const { routes, index } = navigation.state;
  const currentTab = routes[index]
  return (
    <View style={styles.tabStyle}>
      {routes.map(route => (
        <View style={route.routeName == currentTab.routeName ? styles.activeTabStyle : null}>
          <TouchableOpacity
            onPress={() => navigation.navigate(route.routeName)}
            accessibilityLabel="{route.routeName}">
            <Text style={styles.tabStyle}>{route.params.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

// Main View
const SocialLoginSignupView = ({ navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = navigation.router.getComponentForState(navigation.state);
  return (
    <ScrollView style={[styles.container]}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{
                uri: BACKGROUND_URL,
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                resizeMode: 'cover',
              }}>
              <Image
                source={{
                  uri: LOGO_URL,
                }}
                style={{
                  width: 155,
                  height: 155,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </ImageBackground>
          </View>
        </View>
        <View style={[styles.cardView]}>
          <CustomTabBar navigation={navigation} />
          <View style={styles.tabContainerStyle}>
            <ActiveScreen
              navigation={{
                ...navigation,
                state: routes[index],
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  console.log(state)
  return {
    token: state.socialLogin.token,
    api: state.socialLogin.api,
    user: state.socialLogin.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(apiLoginRequest({ username: email, password })),
    signup: (email, password) => dispatch(apiSignupRequest({ email, password })),
    connect_to_facebook: () => dispatch(apiFacebookConnect()),
    connect_to_google: () => dispatch(apiGoogleConnect()),
  };
};

const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);

const LoginSignupRouter = TabRouter(
  {
    Login: {
      screen: SignIn,
      path: 'login',
      params: { name: 'Sign In' },
    },
    SignUp: {
      screen: SignUp,
      path: 'signup',
      params: { name: 'Sign Up' },
    },
  },
  {
    initialRouteName: 'Login',
  }
);

const SocialLoginSignup = createAppContainer(
  createNavigator(SocialLoginSignupView, LoginSignupRouter, {})
);

export default {
  name: 'socialLogin',
  screen: SocialLoginSignup,
  reducer: reducer,
  actions: [apiLoginRequest, apiSignupRequest, apiFacebookConnect, apiGoogleConnect],
};
