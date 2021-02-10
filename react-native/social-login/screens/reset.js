import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { apiPasswordResetRequest } from '../auth/actions';
import { API_PASSWORD_RESET_FAILED } from '../auth/constants';
import { validateEmail, LOGO_URL } from './constants.js';

// Custom use previous hook
function usePrevious(value, initial={}) {
  const targetRef = useRef(value);
  const previousRef = useRef(initial);
  if (targetRef.current !== value) {
    previousRef.current = targetRef.current;
    targetRef.current = value;
  }
  return previousRef.current;
}

const PasswordRecover = props => {
  const [email, setEmail] = useState('');
  const { api } = props;
  const prevProps = usePrevious({ api }, {api : {}});

  useEffect(() => {
    if (prevProps?.api.isLoading) {
      if (api.error?.type === API_PASSWORD_RESET_FAILED) {
        let message =
          api.error?.code === 400
            ? 'This email is not registered.\nPlease signup'
            : api.error.message;
        Alert.alert('Error', message);
      }

      if (api.success) {
        Alert.alert(
          'Password Reset',
          'Password reset link has been sent to your email address'
        );
        props.navigation.goBack();
      }
    }
  }, [api]);

  const handlePasswordReset = () => {
    if (!validateEmail.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    props.reset(email);
  };

  const handleEmail = email => {
    setEmail(email);
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
          uri: LOGO_URL,
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.screen}>
        {renderImage()}
        <Text style={styles.heading}>{'Password Recovery'}</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={email => handleEmail(email)}
            placeholder="eg: yourname@gmail.com"
            size="small"
            style={styles.input}
            keyboardType="email-address"
            textStyle={styles.text}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          disabled={props.api.isLoading}
          activeOpacity={0.7}
          style={[styles.actionButon]}
          onPress={handlePasswordReset}>
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
            props.navigation.goBack();
          }}>
          <Text style={[styles.textRow]}>Back to login?</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    api: state.socialLogin.api,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    reset: email => dispatch(apiPasswordResetRequest({ email })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecover);
