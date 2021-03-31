import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text, Button } from 'react-native';
import { user_read, user_update } from './store/actions';
import { styles, Color } from './styles';
import { connect } from 'react-redux';
import reducer from './store/reducers';
import EditUser from './edit';
import ViewUser from './view';

export class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  load() {
    const { route } = this.props;
    const { auth_user } = this.props;
    const id = route.params?.id || auth_user.id;
    if (id) {
      this.props.getUser(id);
    } else {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      this.setState({ loading: true });
      this.load();
    });
    this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
      this.props.navigation.setParams({ id: null });
    });
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.state;
    const { api } = this.props;

    if (loading && prevProps.api.isLoading && !api.isLoading) {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    try {
      this._unsubscribeFocus();
      this._unsubscribeBlur();
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { loading } = this.state;
    const { isEdit, user } = this.props;
    return (
      <ScrollView style={styles.container} contentStyle={styles.content}>
        {loading ? (
          <View>
            <ActivityIndicator color={Color.steel} />
          </View>
        ) : (
            <View>
              <View>
                {!user.id && <Text>No user to display information.</Text>}
              </View>
              {user.id && (
                <View>
                  {isEdit ? (
                    <EditUser {...this.props} />
                  ) : (
                      <ViewUser {...this.props} />
                    )}
                </View>
              )}
            </View>
          )}
        <Button onPress={() => this.props.navigation.navigate('AppMenu')} title="Hello" />
      </ScrollView>
    );
  }
}

// Either gets user id passed through navigation or attempts to check login reducer:
// thats the reducer for either 'Login and Signup' or 'Social Login' modules.
// Update this code accordingly if you are not using neither modules.
// Check README.md for more information
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.route.params?.id
    ? ownProps.route.params?.id
    : state.login?.user?.id;

  return {
    token: state.login?.token,
    api: state.userProfile.api,
    user: state.userProfile.users.find((user) => user.id === id) || {},
    auth_user: state.login?.user,
    isEdit: id && state.login?.user.id && id === state.login?.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(user_read(id)),
    updateUser: (data, token) => dispatch(user_update(data, token)),
  };
};

export default {
  title: 'userProfile',
  navigator: connect(mapStateToProps, mapDispatchToProps)(UserDetail),
  slice: {
    reducer: reducer
  },
};
