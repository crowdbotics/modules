import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { getUserById, slice } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { styles, Color } from "./styles";
import PropTypes from "prop-types";
import { unwrapResult } from "@reduxjs/toolkit";
import { EditUser } from "./edit";
import ViewUser from "./view";

export const UserProfile = ({ route, textInputStyle = {}, buttonStyle = {}, buttonTextStyle = {}, avatarStyle = {}, editContainerStyle = {}, userInfoContainerStyle = {} }) => {
  const [isEdit, setIsEdit] = useState(false);
  // code below depends on the existence of any login module - update as needed.
  const login = useSelector(state => {
    return state?.login;
  });
  const userId = route?.params?.id || login?.user.id;
  const user = useSelector(state => state.userProfile.users[userId]);
  const api = useSelector(state => state.userProfile.api);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (userId) {
      dispatch(getUserById(userId))
        .then(unwrapResult)
        .then(response => {
          const edit = response.id === login?.user.id;
          setIsEdit(edit);
        })
        .catch(e => console.log(e));
    }
  }, [userId]);

  return (
    <ScrollView style={styles.container} contentStyle={styles.content}>
      {api.loading === "pending"
        ? (
          <View>
            <ActivityIndicator color={Color.steel} />
          </View>
          )
        : (
          <View>
            <View>{!user && <Text>No user to display information.</Text>}</View>
            {user && (
              <View>
                {isEdit ? <EditUser user={user} textInputStyle={textInputStyle} buttonStyle={buttonStyle} buttonTextStyle={buttonTextStyle} avatarStyle={avatarStyle} editContainerStyle={editContainerStyle}/> : <ViewUser user={user} userInfoContainerStyle={userInfoContainerStyle} avatarStyle={avatarStyle}/>}
              </View>
            )}
          </View>
          )}
    </ScrollView>
  );
};

UserProfile.propTypes = {
  avatarStyle: PropTypes.object,
  editContainerStyle: PropTypes.object,
  userInfoContainerStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object
};

export default {
  title: "userProfile",
  navigator: UserProfile,
  slice
};
