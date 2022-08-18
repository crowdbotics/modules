import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const ClientTaskerProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Client Tasker Profile</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20
  }
});

export default ClientTaskerProfile;
