import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Color, styles } from './styles';
import { getInitials, transformLabel } from './utils';
import moment from 'moment';

const UserInfo = props => (
  <View>
    <Text style={styles.label}>{transformLabel(props.label)}</Text>
    <Text style={styles.text}>
      {props.value ? props.value : 'Not available'}
    </Text>
  </View>
);

export default class ViewUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    const birthday = user.birth_date
      ? moment(user.birth_date, 'YYYY-MM-DD').format('LL')
      : null;
    const initials = getInitials(user);
    return (
      <View>
        {user.id ? (
          <View>
            <View style={styles.profileIcon}>
              <Avatar
                size="large"
                rounded
                icon={{ name: 'user', type: 'font-awesome' }}
                title={initials}
                containerStyle={{ backgroundColor: Color.pink }}
              />
            </View>
            <UserInfo
              label="Name"
              value={`${user.first_name} ${user.last_name}`}
            />
            <UserInfo label="Email" value={user.email} />
            <UserInfo label="Birthday" value={birthday} />
            <UserInfo label="Biography" value={user.bio} />
          </View>
        ) : (
          <Text style={styles.label}>No user information available.</Text>
        )}
      </View>
    );
  }
}
