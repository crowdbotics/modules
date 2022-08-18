import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const ScheduleFilter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule Filter</Text>
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

export default ScheduleFilter;
