import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { HOME_SCREEN_NAME, validateEmail } from './constants.js';
import {
  apiLoginRequest,
  apiSignupRequest,
  apiFacebookConnect,
  apiGoogleConnect,
} from '../auth/actions';
import { styles, buttonStyles, textInputStyles, Color } from './styles';
import { connect } from 'react-redux';

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

// Main SignupComponent Class
export class SignUpComponent extends Component {
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
    if (prevProps.api.isLoading && !api.success) {
      const error =
        api.error.code == 400
          ? 'This email is already registered.'
          : api.error.message;

      Alert.alert('Error', error);
      this.setState({
        requestError: api.error,
      });
    }
    if (prevProps.api.isLoading && api.success && user !== {}) {
      Alert.alert(
        'Signup Success',
        'Registration Successful. A confirmation will be sent to your e-mail address.',
      );
    }
  }

  onSignupPress = async () => {
    const { email, password, confirmPassword } = this.state;
    this.setState({ emailError: '' });
    this.setState({ passwordError: '' });
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

// Main SignInComponent Class
export class SignInComponent extends Component {
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
    if (prevProps.api.isLoading && !api.success) {
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

  render() {
    const { email, password, emailError, passwordError } = this.state;
    const { api } = this.props;
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
        {!!api.error && (
          <Text style={textInputStyles.error}>{api.error.message}</Text>
        )}

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

const mapStateToProps = state => {
  console.log(state);
  return {
    token: state.socialLogin.token,
    api: state.socialLogin.api,
    user: state.socialLogin.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) =>
      dispatch(apiLoginRequest({ username: email, password })),
    signup: (email, password) =>
      dispatch(apiSignupRequest({ email, password })),
    connect_to_facebook: () => dispatch(apiFacebookConnect()),
    connect_to_google: () => dispatch(apiGoogleConnect()),
  };
};

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
export const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
