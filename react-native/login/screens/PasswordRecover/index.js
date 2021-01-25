import React, {Component} from 'react';
import {
  Image,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from '../styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {apiPasswordResetRequest} from '../../../../store/auth/actions';
import {API_PASSWORD_RESET_FAILED} from '../../../../store/auth/constants';
import {emailValidationRegex, LOGO_URL} from '../constants.js';

class PasswordRecover extends Component {
  static navigationOptions = {
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {requestError, success} = this.props;
    if (prevProps.isLoading) {
      if (requestError?.type === API_PASSWORD_RESET_FAILED) {
        let message =
          requestError?.code === 400
            ? 'This email is not registered\nPlease signup'
            : requestError.message;
        Alert.alert('Error', message);
      }

      if (success) {
        Alert.alert(
          'Password Reset',
          'Password reset link has been sent to your email address',
        );
        this.props.navigation.goBack();
      }
    }
  }

  renderImage = () => {
    const imageSize = {
      width: 365,
      height: 161,
    };
    return (
      <Image
        style={[styles.image, imageSize]}
        source={{
          uri: LOGO_URL,
        }}
      />
    );
  };

  submitPasswordReset = async () => {
    const {email} = this.state;
    if (!emailValidationRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    this.props.reset(email);
  };

  render() {
    const {email} = this.state;

    return (
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView contentContainerStyle={styles.screen}>
          {this.renderImage()}
          <Text style={styles.heading}>{'Password Recovery'}</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={email => this.setState({email})}
              placeholder="eg: yourname@gmail.com"
              size="small"
              style={styles.input}
              keyboardType="email-address"
              textStyle={styles.text}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            disabled={this.props.isLoading}
            activeOpacity={0.7}
            style={[styles.actionButon]}
            onPress={this.submitPasswordReset}>
            <Text
              style={{
                color: '#fff',
                fontSize: 15,
              }}>
              {'Reset Password'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Text style={[styles.textRow]}>Back to login?</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestError: state.authReducer.error,
    isLoading: state.authReducer.isLoading,
    success: state.authReducer.success,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    reset: email => dispatch(apiPasswordResetRequest({email})),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordRecover);
