import React, { Component } from 'react';
import {
  TextInput,
  View,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from 'react-native-datepicker';
import { Avatar } from 'react-native-elements';
import { inputStyles, Color, buttonStyles, styles } from './styles';
import { getInitials, transformLabel } from './utils';
import moment from 'moment';

export const Button = props => (
  <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
    <View style={buttonStyles.view}>
      {props.loading ? (
        <ActivityIndicator color={Color.white} />
      ) : (
          <Text style={buttonStyles.text}>{props.title}</Text>
        )}
    </View>
  </TouchableOpacity>
);

export const InputContainer = props => (
  <View>
    <Text style={inputStyles.label}>{transformLabel(props.label)}</Text>
    <View>
      {props.isDate ? (
        <DateTimePicker
          style={[inputStyles.input, inputStyles.date]}
          customStyles={{ dateInput: { borderWidth: 0 } }}
          format="MM-DD-YYYY"
          mode="date"
          display="default"
          {...props}
        />
      ) : (
          <TextInput
            autoCapitalize="none"
            style={inputStyles.input}
            placeholderTextColor={Color.steel}
            underlineColorAndroid={'transparent'}
            {...props}
          />
        )}
      {!!props.error && <Text style={inputStyles.error}>{props.error}</Text>}
    </View>
  </View>
);

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const birthdate = this.props.user.birth_date
      ? new Date(this.props.user.birth_date)
      : null;
    this.state = {
      initials: getInitials(this.props.user),
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      email: this.props.user.email,
      birth_date: birthdate,
      bio: this.props.user.bio,
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.state;
    const { api } = this.props;
    if (prevProps.api.isLoading && !api.errors && loading) {
      Alert.alert('User Updated', 'User information was successfully updated.');
      this.setState({ loading: false });
    }
  }

  onSaveProfile = () => {
    this.setState({ loading: true });
    const birthdate = this.state.birth_date
      ? moment(this.state.birth_date, 'MM-DD-YYYY').format('YYYY-MM-DD')
      : null;
    this.props.updateUser(
      {
        id: this.props.user.id,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        bio: this.state.bio,
        birth_date: birthdate,
      },
      this.props.token,
    );
  };

  render() {
    const { api } = this.props;
    return (
      <View>
        <View style={styles.profileIcon}>
          <Avatar
            size="large"
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            title={this.state.initials}
            containerStyle={{ backgroundColor: Color.pink }}
          />
        </View>

        <InputContainer
          keyboardType="default"
          label="First Name"
          placeholder="John"
          onChangeText={value => this.setState({ first_name: value })}
          value={this.state.first_name}
        />
        <InputContainer
          keyboardType="default"
          label="Last Name"
          placeholder="Doe"
          onChangeText={value => this.setState({ last_name: value })}
          value={this.state.last_name}
        />
        <InputContainer
          keyboardType="email-address"
          label="Email Address"
          placeholder="email@email.com"
          onChangeText={value => this.setState({ email: value })}
          value={this.state.email}
          error={this.state.email ? '' : `E-mail address field is required.`}
        />

        <InputContainer
          isDate={true}
          label="Birth Date"
          placeholder="01/01/1900"
          maxDate={new Date()}
          onDateChange={value => this.setState({ birth_date: value })}
          date={this.state.birth_date}
        />
        <InputContainer
          label="Bio"
          multiline={true}
          numberOfLines={2}
          placeholder="Write something about yourself."
          onChangeText={value => this.setState({ bio: value })}
          value={this.state.bio}
        />
        <Button
          title="Save"
          loading={api.isLoading}
          onPress={this.onSaveProfile}
        />
      </View>
    );
  }
}
