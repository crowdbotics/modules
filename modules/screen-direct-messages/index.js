import React from "react";
import { Text, StyleSheet, View } from "react-native";

const DirectMessagesScreen = (params) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingTxt}>Direct Messages Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    justifyContent: "space-around"
  },
  headingTxt: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 2,
    marginVertical: 12
  }
});

export default DirectMessagesScreen;
