import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { apiAuthUserRequest, apiLogoutRequest } from '../auth/actions';


const UserDemo = props => {
  const { api, user, token, navigation } = props;
  const isFocused = navigation.isFocused();

  useEffect(() => {
    if (!token) props.navigation.navigate('LoginSignup')
    if (!api.isLoading && !user.email && !api.error) {
      props.get_user(props.token);
    }
  }, [props, isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello, {user.username || user.name}!</Text>
      <Text style={styles.text}>First Name: {props.user.first_name}</Text>
      <Text style={styles.text}>Last Name: {props.user.last_name}</Text>
      <Text style={styles.text}>Email: {props.user.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.logout(props.token)}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    api: state.socialLogin.api,
    user: state.socialLogin.user || {},
    token: state.socialLogin.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    get_user: token => dispatch(apiAuthUserRequest(token)),
    logout: token => dispatch(apiLogoutRequest(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDemo);
