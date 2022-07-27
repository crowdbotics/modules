import React, { useState } from "react";
import {
  TextInput,
  View,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Avatar } from "react-native-elements";
import { inputStyles, Color, buttonStyles, styles } from "./styles";
import { getInitials, transformLabel } from "./utils";
import { updateUserById } from "./store";
import { useSelector, useDispatch } from "react-redux";

export const Button = props => (
  <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
    <View style={[buttonStyles.view, props.buttonStyle]}>
      {props.loading
        ? (
        <ActivityIndicator color={Color.white} />
          )
        : (
        <Text style={[buttonStyles.text, props.buttonTextStyle]}>{props.title}</Text>
          )}
    </View>
  </TouchableOpacity>
);

export const InputContainer = props => (
  <View>
    <Text style={inputStyles.label}>{transformLabel(props.label)}</Text>
    <View>
      <TextInput
        autoCapitalize="none"
        style={[inputStyles.input, props.textInputStyle]}
        placeholderTextColor={Color.steel}
        underlineColorAndroid={"transparent"}
        {...props}
      />

      {!!props.error && <Text style={inputStyles.error}>{props.error}</Text>}
    </View>
  </View>
);

export const EditUser = props => {
  const { user } = props;
  const initials = getInitials(user);
  const [form, setForm] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    bio: user.bio
  });
  // code below depends on the existence of any login module - update as needed.
  const login = useSelector(state => {
    return state?.login;
  });
  const api = useSelector(state => state.userProfile.api);
  const dispatch = useDispatch();

  const onUpdateForm = (key, value) => {
    setForm({
      ...form,
      [key]: value
    });
  };

  const onSaveProfile = async () => {
    const payload = { data: { ...form, id: user.id }, token: login?.token };
    dispatch(updateUserById(payload))
      .then(() =>
        Alert.alert(
          "User Updated",
          "User information was successfully updated."
        )
      )
      .catch(e => {
        // handle your custom error message here
        console.log(e.message);
        Alert.alert(
          "User Update Failed",
          `An unexpected error happened: ${e.message}`
        );
      });
  };
  return (
    <View style={props.editContainerStyle}>
      <View style={styles.profileIcon}>
        <Avatar
          size="large"
          rounded
          icon={{ name: "user", type: "font-awesome" }}
          title={initials}
          containerStyle={[{ backgroundColor: Color.pink }, props.avatarStyle]}
        />
      </View>

      <InputContainer
        keyboardType="default"
        label="First Name"
        placeholder="John"
        onChangeText={value => onUpdateForm("first_name", value)}
        value={form.first_name}
        textInputStyle={props.textInputStyle}
      />
      <InputContainer
        keyboardType="default"
        label="Last Name"
        placeholder="Doe"
        onChangeText={value => onUpdateForm("last_name", value)}
        value={form.last_name}
        textInputStyle={props.textInputStyle}
      />
      <InputContainer
        keyboardType="email-address"
        label="Email Address"
        placeholder="email@email.com"
        onChangeText={value => onUpdateForm("email", value)}
        value={form.email}
        error={form.email ? "" : "E-mail address field is required."}
        textInputStyle={props.textInputStyle}
      />
      <InputContainer
        label="Bio"
        multiline={true}
        numberOfLines={2}
        placeholder="Write something about yourself."
        onChangeText={value => onUpdateForm("bio", value)}
        value={form.bio}
        textInputStyle={props.textInputStyle}
      />
      <Button
        title="Save"
        loading={api.loading === "pending"}
        onPress={onSaveProfile}
        buttonStyle = {props.buttonStyle}
        buttonTextStyle = {props.buttonTextStyle}
      />
    </View>
  );
};
