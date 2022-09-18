import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const VideoCallPeopleList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Video Call People List</Text>
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

export default VideoCallPeopleList;
