import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { getUserById, slice } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { styles, Color } from "./styles";
import { unwrapResult } from "@reduxjs/toolkit";
import { EditUser } from "./edit";
import ViewUser from "./view";

export const UserProfile = ({ route }) => {
  const [isEdit, setIsEdit] = useState(false);
  // code below depends on the existence of any login module - update as needed.
  const login = useSelector(state => {
    return state?.login;
  });
  const userId = route.params?.id || login?.user.id;
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
              {isEdit ? <EditUser user={user} /> : <ViewUser user={user} />}
            </View>
          )}
        </View>
          )}
    </ScrollView>
  );
};

export default {
  title: "userProfile",
  navigator: UserProfile,
  slice
};
