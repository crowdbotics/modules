import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const DiagnoseResultsLowRisk = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Diagnose Results Low Risk</Text>
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

export default {
  title: "DiagnoseResultsLowRisk",
  navigator: DiagnoseResultsLowRisk
};
