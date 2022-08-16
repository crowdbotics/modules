import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const RideShareWelcome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ride Share Welcome</Text>
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

export default RideShareWelcome;
